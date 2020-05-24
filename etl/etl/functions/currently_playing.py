import datetime
import json
import logging
import boto3
import pytz
import requests

from etl.config import BUCKET_NAME, USER_ID
from etl.auth import SpotifyAPIAuth

S3 = boto3.resource("s3", region_name='us-east-1').Bucket(BUCKET_NAME)
CURRENT_PLAYBACK_ENDPOINT = "https://api.spotify.com/v1/me/player"


def save_to_s3(data):
    """
    Save the data to s3
    """
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%d/%H-%M-%S")
    file_name = f"user-{USER_ID}/currently-playing/{timestamp}.json"
    print(f"Saving data ({file_name}) to S3.")
    S3.Object(key=file_name).put(Body=json.dumps(data))


def check_response(res, auth, try2=False):
    """
    Handle common status codes and either return the response or None.
    """
    if res.status_code == 503:
        print("503 Server Error: Service Unavailable for url {res.url}.")
        return None

    if res.status_code == 401:
        if try2:
            print("401 Unauthorized: Second try, raising.")
            res.raise_for_status()

        print("401 Unauthorized: Refreshing tokens and trying again.")
        auth.refresh_tokens()
        res = requests.get(CURRENT_PLAYBACK_ENDPOINT, auth=auth)
        return check_response(res, auth, try2=True)

    if res.status_code == 204:  # no content, nothing currently
        print(f"Nothing currently playing for user {USER_ID}.")
        return None

    res.raise_for_status()
    return res


def log_data(data):
    timestamp = datetime.datetime.fromtimestamp(data["timestamp"] * 0.001, tz=pytz.utc)
    is_playing = data["is_playing"]
    currently_playing_type = data["currently_playing_type"]
    item = data["item"]
    print(f"Timestamp: {timestamp}")
    print(f"Is Playing: {is_playing}")
    print(f"Type: {currently_playing_type}")
    if item and currently_playing_type == "track":
        artist = next(iter(item.get("artists", [])), None)
        if artist and artist.get("name", None):
            print(f"Artist: {artist['name']}")
        album = item.get("album", {}).get("name", None)
        if album:
            print(f"Album: {album}")
        track = item.get("name", None)
        if track:
            print(f"Track: {track}")


def handler(event, context, save=True):
    """
    Request and save the currently playing tracks by the authenticated user from spotify to s3
    """
    auth = SpotifyAPIAuth()
    res = requests.get(CURRENT_PLAYBACK_ENDPOINT, auth=auth)
    res = check_response(res, auth)
    if res is None:
        return

    data = res.json()
    log_data(data)
    if save and data:
        save_to_s3(data)

    return data
