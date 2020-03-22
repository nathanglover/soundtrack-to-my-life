import datetime
import json
import logging

import boto3
import pytz
import requests


client = boto3.client("ssm")


class SpotifyAPIAuth(requests.auth.AuthBase):
    def __init__(self):
        self.parameter_name = "spotify-api-access-tokens"
        self.token_url = "https://accounts.spotify.com/api/token"

    @staticmethod
    def __get_client_secret_auth() -> (str, str):
        print("Getting client id and client secret")
        parameter_name = "spotify-api-client-secrets"
        response = client.get_parameter(Name=parameter_name, WithDecryption=True)
        data = json.loads(response["Parameter"]["Value"])
        return (data["client_id"], data["client_secret"])

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
            self.refresh_tokens()

    def __save_new_tokens(self, tokens) -> dict:
        print("Saving new tokens to s3.")
        value = json.dumps(tokens)
        return client.put_parameter(
            Name=self.parameter_name, Value=value, Type="SecureString", Overwrite=True,
        )

    def refresh_tokens(self):
        print("Refreshing Spotify access tokens")
        refresh_token = self.tokens["refresh_token"]
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }
        res = requests.post(
            self.token_url, data=data, auth=self.__get_client_secret_auth()
        )
        new_tokens = res.json()
        if "refresh_token" not in new_tokens:
            new_tokens["refresh_token"] = refresh_token

        self.__save_new_tokens(new_tokens)
        self.tokens = new_tokens

    def __call__(self, r):
        print("Authenticating with Spotify")
        self.__set_tokens()
        r.headers["authorization"] = f"Bearer {self.tokens['access_token']}"
        return r
