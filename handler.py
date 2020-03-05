import config
import datetime
import json
import logging
import requests
import boto3

from auth import SpotifyAPIAuth

logger = logging.getLogger(__name__)
s3 = boto3.resource("s3").Bucket("spotify-api")
user_id = "125242111"


def save_to_s3(data):
    """
    Save the data to s3
    """
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%d/%H-%M-%S")
    file_name = f"user-{user_id}/currently-playing/{timestamp}.json"
    logger.info("Saving data (%s) to s3", file_name)
    s3.Object(key=file_name).put(Body=json.dumps(data))


def currently_playing():
    """
    Request and return the currently playing tracks by the authenticated user from spotify.
    """

    # find currently playing
    url = "https://api.spotify.com/v1/me/player/currently-playing"
    logger.info("Requesting %s", url)
    res = requests.get(url, auth=SpotifyAPIAuth())
    res.raise_for_status()

    if res.status_code == 204:  # no content, nothing currently
        logger.info("Nothing currently playing for user %s.", user_id)
        return None

    return res.json()


def handler(event, context):
    data = currently_playing()
    if data:
        save_to_s3(data)


if __name__ == "__main__":
    handler("", "")
