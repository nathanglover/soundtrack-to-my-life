import datetime
import json
import io

import pytest

import etl
from etl.config import BUCKET_NAME
from etl.functions.insert_timeline_documents import (
    MAX_KEYS,
    create_document,
    get_album,
    get_artist,
    get_context,
    get_device,
    get_episode,
    get_release_date,
    get_response_data,
    get_track,
    get_urls,
    handler,
    process_s3_response,
    timeline_documents,
    timeline_documents_generator,
    IsPlayingException,
)


def test_create_document(mocker, currently_playing_track_data):
    item = {
        "Key": "key",
        "LastModified": datetime.datetime.now(),
    }
    mocker.patch(
        "etl.functions.insert_timeline_documents.get_response_data",
        return_value=currently_playing_track_data,
    )
    document = create_document(item)
    assert "key" in document.keys()
    assert "user" in document.keys()
    assert "created" in document.keys()
    assert "timestamp" in document.keys()
    assert "progress_ms" in document.keys()
    assert "type" in document.keys()
    assert "is_playing" in document.keys()
    assert "shuffle_state" in document.keys()
    assert "repeat_state" in document.keys()
    assert "context" in document.keys()
    assert "device" in document.keys()
    assert "track" in document.keys()
    assert "episode" in document.keys()

    mocker.patch(
        "etl.functions.insert_timeline_documents.get_response_data",
        return_value={"is_playing": False},
    )
    with pytest.raises(IsPlayingException):
        document = create_document(item)


def test_get_response_data(mocker):
    mocker.patch(
        "etl.functions.insert_timeline_documents.S3.get_object",
        return_value={"Body": io.StringIO(initial_value="{}")},
    )
    data = get_response_data("key")
    assert type(data) is dict


def test_get_album(currently_playing_track_data):
    assert get_album(None) is None
    album = get_album(currently_playing_track_data["item"])
    assert "id" in album.keys()
    assert "artists" in album.keys()
    assert "images" in album.keys()
    assert "name" in album.keys()
    assert "release_date" in album.keys()
    assert "release_date_precision" in album.keys()
    assert "total_tracks" in album.keys()
    assert "type" in album.keys()
    assert "urls" in album.keys()
    assert "uri" in album.keys()


def test_get_artist(currently_playing_track_data):
    assert get_artist(None) is None
    artist = get_artist(currently_playing_track_data["item"]["artists"][0])
    assert "id" in artist.keys()
    assert "name" in artist.keys()
    assert "type" in artist.keys()
    assert "uri" in artist.keys()
    assert "urls" in artist.keys()


def test_get_context(currently_playing_track_data):
    assert get_context(None) is None
    context = get_context(currently_playing_track_data["context"])
    assert "type" in context.keys()
    assert "uri" in context.keys()
    assert "urls" in context.keys()


def test_device(currently_playing_track_data):
    assert get_device(None) is None
    device = get_device(currently_playing_track_data["device"])
    assert "id" in device.keys()
    assert "name" in device.keys()
    assert "type" in device.keys()
    assert "volume_percent" in device.keys()


def test_get_episode(currently_playing_episode_data):
    assert get_episode(currently_playing_episode_data["item"], "track") is None
    assert get_episode(currently_playing_episode_data["item"], "episode") is None


def test_get_release_date():
    assert get_release_date("", "") is None
    assert get_release_date("2020-05-17", "day") == datetime.datetime(2020, 5, 17)
    assert get_release_date("2020-05", "month") == datetime.datetime(2020, 5, 1)
    assert get_release_date("2020", "year") == datetime.datetime(2020, 1, 1)


def test_get_track(currently_playing_track_data):
    assert get_track(currently_playing_track_data["item"], "episode") is None
    track = get_track(currently_playing_track_data["item"], "track")
    assert "id" in track.keys()
    assert "album" in track.keys()
    assert "artists" in track.keys()
    assert "disc_number" in track.keys()
    assert "duration_ms" in track.keys()
    assert "explicit" in track.keys()
    assert "name" in track.keys()
    assert "popularity" in track.keys()
    assert "track_number" in track.keys()
    assert "type" in track.keys()
    assert "urls" in track.keys()
    assert "uri" in track.keys()


def test_get_urls(currently_playing_track_data):
    assert get_urls(None) is None
    urls = get_urls(currently_playing_track_data["item"])
    assert "api" in urls.keys()
    assert "web" in urls.keys()
    assert "preview" in urls.keys()


def test_process_s3_response(mocker):
    assert process_s3_response({}) == []
    mocker.patch("etl.functions.insert_timeline_documents.timeline_documents_generator")
    process_s3_response({"Contents": [1, 2, 3]})
    etl.functions.insert_timeline_documents.timeline_documents_generator.assert_called_once()


def test_timeline_documents_generator(mocker, currently_playing_track_data):
    item = {
        "Key": "key",
        "LastModified": datetime.datetime.now(),
    }
    mocker.patch(
        "etl.functions.insert_timeline_documents.get_response_data",
        return_value=currently_playing_track_data,
    )
    assert len(list(timeline_documents_generator([item]))) == 1
    mocker.patch(
        "etl.functions.insert_timeline_documents.get_response_data",
        return_value={"is_playing": False},
    )
    assert len(list(timeline_documents_generator([item]))) == 0


def test_timeline_documents_empty(mocker):
    mocker.patch(
        "etl.functions.insert_timeline_documents.collection.find_one", return_value=None
    )
    mocker.patch("etl.functions.insert_timeline_documents.S3.list_objects_v2"),
    mocker.patch("etl.functions.insert_timeline_documents.process_s3_response")
    timeline_documents()
    etl.functions.insert_timeline_documents.S3.list_objects_v2.assert_called_once_with(
        Bucket=BUCKET_NAME, MaxKeys=MAX_KEYS
    )
    etl.functions.insert_timeline_documents.process_s3_response.assert_called_once()


def test_handler(mocker):
    mocker.patch(
        "etl.functions.insert_timeline_documents.timeline_documents",
        return_value=[1, 2, 3],
    )
    mocker.patch("etl.functions.insert_timeline_documents.collection")
    handler(None, None, True)
    etl.functions.insert_timeline_documents.timeline_documents.assert_called_once()
    etl.functions.insert_timeline_documents.collection.insert_many.assert_called_once_with(
        [1, 2, 3], ordered=True
    )
