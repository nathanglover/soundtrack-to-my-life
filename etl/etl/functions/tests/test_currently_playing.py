import requests
import pytest

import etl
from etl.auth import SpotifyAPIAuth
from etl.functions import currently_playing


def test_save_to_s3(mocker, currently_playing_track_data):
    mocker.patch("etl.functions.currently_playing.S3.Object")
    currently_playing.save_to_s3(currently_playing_track_data)
    etl.functions.currently_playing.S3.Object.assert_called_once()


def test_check_response_204(requests_mock):
    url = currently_playing.CURRENT_PLAYBACK_ENDPOINT
    requests_mock.get(url, status_code=204)
    res1 = requests.get(url)
    res2 = currently_playing.check_response(res1, None)
    assert res2 is None


def test_check_response_200(requests_mock, currently_playing_track_data):
    url = currently_playing.CURRENT_PLAYBACK_ENDPOINT
    requests_mock.get(url, json=currently_playing_track_data)
    res1 = requests.get(url)
    res2 = currently_playing.check_response(res1, None)
    assert res1 is res2


def test_check_response_401_try1(mocker, requests_mock):
    auth = SpotifyAPIAuth()
    mocker.patch.object(auth, "refresh_tokens")
    url = currently_playing.CURRENT_PLAYBACK_ENDPOINT
    requests_mock.get(url, status_code=401)
    res1 = requests.get(url)
    requests_mock.get(url, status_code=200)
    res2 = currently_playing.check_response(res1, auth)
    auth.refresh_tokens.assert_called_once()
    assert res2.status_code == 200


def test_check_response_401_try2(requests_mock):
    url = currently_playing.CURRENT_PLAYBACK_ENDPOINT
    requests_mock.get(url, status_code=401)
    res1 = requests.get(url)
    with pytest.raises(requests.HTTPError):
        currently_playing.check_response(res1, None, try2=True)


def test_check_response_503(requests_mock):
    url = currently_playing.CURRENT_PLAYBACK_ENDPOINT
    requests_mock.get(url, status_code=503)
    res1 = requests.get(url)
    assert currently_playing.check_response(res1, None) is None


def test_log_data(currently_playing_track_data):
    currently_playing.log_data(currently_playing_track_data)


def test_handler(mocker, requests_mock, currently_playing_track_data):
    url = currently_playing.CURRENT_PLAYBACK_ENDPOINT
    requests_mock.get(url, json=currently_playing_track_data)
    mocker.patch("etl.functions.currently_playing.save_to_s3")
    currently_playing.handler(None, None, True)
    etl.functions.currently_playing.save_to_s3.assert_called_once_with(
        currently_playing_track_data
    )
    requests_mock.get(url, status_code=503)
    currently_playing.handler(None, None, True)
