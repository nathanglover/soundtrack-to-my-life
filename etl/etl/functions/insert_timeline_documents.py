import datetime
import json
from collections import namedtuple
from typing import Iterable, Optional

import boto3
import pymongo
import pytz

from etl.config import BUCKET_NAME, USER_ID, get_mongodb_client

MAX_KEYS = 1000
S3 = boto3.client("s3")

collection = (
    get_mongodb_client().get_database("soundtrackToMyLife").get_collection("timeline")
)


class IsPlayingException(Exception):
    pass


def get_response_data(key):
    obj = S3.get_object(Bucket=BUCKET_NAME, Key=key)
    return json.load(obj["Body"])


def get_urls(data):
    if not data:
        return None

    urls = {
        "api": data.get("href"),
        "web": data.get("external_urls").get("spotify"),
    }

    if "preview_url" in data:
        urls["preview"] = data["preview_url"]

    return urls


def get_context(data):
    if not data:
        return None

    return {
        "type": data.get("type"),
        "uri": data.get("uri"),
        "urls": get_urls(data),
    }


def get_device(data):
    if not data:
        return None

    return {
        "id": data.get("id"),
        "name": data.get("name"),
        "type": data.get("type"),
        "volume_percent": data.get("volume_percent"),
    }


def get_artist(data):
    if not data:
        return None

    return {
        "id": data.get("id"),
        "name": data.get("name"),
        "type": data.get("type"),
        "uri": data.get("uri"),
        "urls": get_urls(data),
    }


def get_release_date(release_date: str, precision: str):
    if precision == "day":
        return datetime.datetime.strptime(release_date, "%Y-%m-%d")
    if precision == "month":
        return datetime.datetime.strptime(release_date, "%Y-%m")
    elif precision == "year":
        return datetime.datetime.strptime(release_date, "%Y")

    return None


def get_album(data):
    if not data:
        return None

    release_date_precision = data.get("release_date_precision")
    return {
        "id": data.get("id"),
        "artists": [get_artist(artist) for artist in data.get("artists", [])],
        "images": data.get("images"),
        "name": data.get("name"),
        "release_date": get_release_date(
            data.get("release_date"), release_date_precision,
        ),
        "release_date_precision": release_date_precision,
        "total_tracks": 12,
        "type": data.get("album_type"),
        "urls": get_urls(data),
        "uri": data.get("uri"),
    }


def get_track(data, currently_playing_type):
    if not data or currently_playing_type != "track":
        return None

    return {
        "id": data.get("id"),
        "album": get_album(data.get("album")),
        "artists": [get_artist(artist) for artist in data.get("artists", [])],
        "disc_number": data.get("disc_number"),
        "duration_ms": data.get("duration_ms"),
        "explicit": data.get("explicit"),
        "name": data.get("name"),
        "popularity": data.get("popularity"),
        "track_number": data.get("track_number"),
        "type": data.get("type"),
        "urls": get_urls(data),
        "uri": data.get("uri"),
    }


# todo: add podcast information once spotify starts sending it in the api response
def get_episode(data, currently_playing_type):
    if not data or currently_playing_type != "episode":
        return None


def create_document(item) -> dict:
    """
    Creates a timeline document from the raw spotify currently playing response.
    """

    key = item["Key"]
    created = item["LastModified"]
    data = get_response_data(key)

    is_playing = data.get("is_playing")
    if not is_playing:
        raise IsPlayingException("Item Not Playing")

    currently_playing_type = data.get("currently_playing_type")
    document = {
        "key": key,
        "user": USER_ID,
        "created": created,
        "timestamp": datetime.datetime.fromtimestamp(
            data.get("timestamp") * 0.001, tz=pytz.utc
        ),
        "progress_ms": data.get("progress_ms"),
        "type": currently_playing_type,
        "is_playing": data.get("is_playing", False),
        "shuffle_state": data.get("shuffle_state", False),
        "repeat_state": data.get("repeat_state"),
    }
    context = data.get("context")
    if context:
        document["context"] = get_context(context)

    item = data.get("item")
    document["device"] = get_device(data.get("device"))
    document["track"] = get_track(item, currently_playing_type)
    document["episode"] = get_episode(item, currently_playing_type)
    return document


def timeline_documents_generator(contents) -> dict:
    print(f"Creating {len(contents)} new timeline documents.")
    for item in contents:
        try:
            yield create_document(item)
        except IsPlayingException:
            continue


def process_s3_response(res) -> [Iterable[dict]]:
    """
    Returns either a timeline document generator or None if there are no documents to process.
    """
    try:
        contents = res["Contents"]
    except KeyError:
        print("No new documents to add.")
        return []
    return timeline_documents_generator(contents)


def timeline_documents() -> Optional[Iterable[dict]]:
    """
    Returns a generator of all the timeline documents that need to be added or None.
    """
    empty = collection.find_one() is None
    if empty:
        res = S3.list_objects_v2(Bucket=BUCKET_NAME, MaxKeys=MAX_KEYS)
        return process_s3_response(res)

    last_res = collection.find().sort("created", pymongo.DESCENDING).limit(1)[0]
    last_key = last_res["key"]
    res = S3.list_objects_v2(Bucket=BUCKET_NAME, MaxKeys=MAX_KEYS, StartAfter=last_key,)
    return process_s3_response(res)


def handler(event, context, save=True) -> None:
    """
    Save new files from s3 to the mongo db database.
    """
    documents = list(timeline_documents())
    if save and documents:
        print("Saving new timeline documents.")
        collection.insert_many(documents, ordered=True)
        return
