import requests
import pytest
from etl.functions import currently_playing


def test_check_response_204(requests_mock):
    url = currently_playing.CURRENTLY_PLAYING_ENDPOINT
    requests_mock.get(url, status_code=204)
    res1 = requests.get(url)
    res2 = currently_playing.check_response(res1, None)
    assert res2 is None


def test_check_response_200(requests_mock, currently_playing_data):
    url = currently_playing.CURRENTLY_PLAYING_ENDPOINT
    requests_mock.get(url, json=currently_playing_data)
    res1 = requests.get(url)
    res2 = currently_playing.check_response(res1, None)
    assert res1 is res2


def test_check_response_401_try2(requests_mock):
    url = currently_playing.CURRENTLY_PLAYING_ENDPOINT
    requests_mock.get(url, status_code=401)
    res1 = requests.get(url)
    with pytest.raises(requests.HTTPError):
        currently_playing.check_response(res1, None, try2=True)


def test_log_data(currently_playing_data, capsys):
    currently_playing.log_data(currently_playing_data)
