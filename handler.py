import datetime
import json
import requests
import boto3
import time
from auth import spotify_api_auth


s3 = boto3.resource("s3").Bucket("spotify-api")


def save_to_s3(data):
    """
    Save the data to s3.
    """
    user_id = "125242111"
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%d/%H-%M-%S")
    file_name = f"user-{user_id}/currently-playing/{timestamp}.json"
    s3.Object(key=file_name).put(Body=json.dumps(data))


def currently_playing():
    """
    Request and return the currently playing tracks by the authenticated user from spotify.
    """

    # find currently playing
    url = "https://api.spotify.com/v1/me/player/currently-playing"
    res = requests.get(url, auth=spotify_api_auth)
    res.raise_for_status()

    if res.status_code == 204:  # no content, nothing currently playing
        return None

    return res.json()


def handler(event, context):
    data = currently_playing()
    if data:
        save_to_s3(data)


if __name__ == "__main__":
    handler("", "")
