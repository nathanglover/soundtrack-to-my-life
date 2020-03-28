import datetime
import json
from requests import PreparedRequest

import etl
from etl.auth import SpotifyAPIAuth


def test_init():
    auth = SpotifyAPIAuth()
    assert auth.parameter_name == "spotify-api-access-tokens"
    assert auth.token_url == "https://accounts.spotify.com/api/token"


def test_get_client_secret_auth(mocker):
    auth = ("xxxxx", "yyyyy")
    res = {"Parameter": {"Value": '{"client_id": "xxxxx", "client_secret": "yyyyy"}'}}
    mocker.patch("etl.auth.client.get_parameter", return_value=res)
    assert SpotifyAPIAuth._get_client_secret_auth() == auth


def test_set_tokens(mocker):
    auth = SpotifyAPIAuth()
    tokens = {"access_token": "xxxxx", "expires_in": 3600}
    res = {
        "Parameter": {
            "LastModifiedDate": datetime.datetime(2020, 1, 1),
            "Value": json.dumps(tokens),
        }
    }
    mocker.patch("etl.auth.client.get_parameter", return_value=res)
    mocker.patch.object(auth, "refresh_tokens")

    auth._set_tokens()

    assert auth.tokens["access_token"] == tokens["access_token"]
    auth.refresh_tokens.assert_called_once()


def test_save_new_tokens(mocker):
    auth = SpotifyAPIAuth()
    mocker.patch("etl.auth.client.put_parameter")
    auth._save_new_tokens({})
    etl.auth.client.put_parameter.assert_called_once_with(
        Name=auth.parameter_name, Value="{}", Type="SecureString", Overwrite=True
    )


def test_refresh_tokens(mocker, requests_mock):
    auth = SpotifyAPIAuth()
    start_access_token = "xxxxx"
    end_access_token = "aaaaa"
    refresh_token = "yyyyy"
    auth.tokens = {"access_tokens": start_access_token, "refresh_token": refresh_token}
    requests_mock.post(url=auth.token_url, json={"access_token": end_access_token})
    mocker.patch.object(auth, "_save_new_tokens")

    auth.refresh_tokens()

    auth._save_new_tokens.assert_called_once()
    assert auth.tokens["access_token"] == end_access_token
    assert auth.tokens["refresh_token"] == refresh_token


def test__call__(mocker):
    auth = SpotifyAPIAuth()
    mocker.patch.object(auth, "_set_tokens")
    auth.tokens = {"access_token": "xxxxx"}
    req = PreparedRequest()
    req.prepare(method="GET", url="https://spotify.com", auth=auth)
    assert req.headers["authorization"] == "Bearer xxxxx"
