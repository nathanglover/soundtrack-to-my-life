import datetime
import json
import logging

import boto3
import pytz
import requests


logger = logging.getLogger(__name__)

client = boto3.client("ssm")


class SpotifyAPIAuth(requests.auth.AuthBase):
    def __init__(self):
        logger.info("Authenticating with Spotify")
        self.parameter_name = "spotify-api-access-tokens"
        self.token_url = "https://accounts.spotify.com/api/token"
        self.__set_client_secret_auth()
        self.__set_tokens()

    def __set_client_secret_auth(self) -> (str, str):
        parameter_name = "spotify-api-client-secrets"
        response = client.get_parameter(Name=parameter_name, WithDecryption=True)
        data = json.loads(response["Parameter"]["Value"])
        self.client_secret_auth = (data["client_id"], data["client_secret"])

    def __set_tokens(self) -> dict:
        response = client.get_parameter(Name=self.parameter_name, WithDecryption=True)
        parameter = response["Parameter"]
        last_modifed = parameter["LastModifiedDate"]
        tokens = json.loads(parameter["Value"])
        expires_at = (
            last_modifed + datetime.timedelta(seconds=tokens["expires_in"])
        ).astimezone(pytz.utc)
        now = datetime.datetime.now(datetime.timezone.utc)

        self.tokens = tokens
        if now > expires_at:
            self.__refresh_tokens()

    def __save_new_tokens(self, tokens) -> dict:
        logger.info("Saving new tokens to s3.")
        value = json.dumps(tokens)
        return client.put_parameter(
            Name=self.parameter_name, Value=value, Type="SecureString", Overwrite=True,
        )

    def __refresh_tokens(self):
        logger.info("Refreshing Spotify access tokens")
        refresh_token = self.tokens["refresh_token"]
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }
        res = requests.post(self.token_url, data=data, auth=self.client_secret_auth)
        new_tokens = res.json()
        if "refresh_token" not in new_tokens:
            new_tokens["refresh_token"] = refresh_token

        self.__save_new_tokens(new_tokens)
        self.tokens = new_tokens

    def __call__(self, r):
        r.headers["authorization"] = f"Bearer {self.tokens['access_token']}"
        return r
