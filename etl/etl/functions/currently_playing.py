import datetime
import json
import logging
import requests
import boto3

from etl import config
from etl.auth import SpotifyAPIAuth

S3 = boto3.resource("s3").Bucket("spotify-api")
USER_ID = "125242111"
CURRENTLY_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"


def save_to_s3(data):
    """
    Save the data to s3
    """
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%d/%H-%M-%S")
    file_name = f"user-{USER_ID}/currently-playing/{timestamp}.json"
    print(f"Saving data ({file_name}) to s3.")
    S3.Object(key=file_name).put(Body=json.dumps(data))


def check_response(res, auth, try2=False):
    """
    Handle common status codes and either return the response or None.
    """

    if res.status_code == 401:
        if try2:
            print("401 Unauthorized: Second try, raising.")
            res.raise_for_status()

        print("401 Unauthorized: Refreshing tokens and trying again.")
        auth.refresh_tokens()
        res = requests.get(CURRENTLY_PLAYING_ENDPOINT, auth=SpotifyAPIAuth())
        return check_response(res, auth, try2=True)

    if res.status_code == 204:  # no content, nothing currently
        print(f"Nothing currently playing for user {USER_ID}.")
        return None

    res.raise_for_status()
    return res


def handler(event, context, save):
    """
    Request and save the currently playing tracks by the authenticated user from spotify to s3
    """

    auth = SpotifyAPIAuth()
    res = requests.get(CURRENTLY_PLAYING_ENDPOINT, auth=auth)
    res = check_response(res, auth)

    if res is None:
        return

    data = res.json()
    if save and data:
        save_to_s3(data)

    return data
