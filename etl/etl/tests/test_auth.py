import boto3
from botocore.stub import Stubber
from etl.auth import SpotifyAPIAuth


def test_init():
    auth = SpotifyAPIAuth()
    assert auth.parameter_name == "spotify-api-access-tokens"
    assert auth.token_url == "https://accounts.spotify.com/api/token"


def test__get_client_secret_auth():
    auth = SpotifyAPIAuth()
