import json

import pytest
from click.testing import CliRunner


@pytest.fixture
def currently_playing_episode_data():
    with open("fixtures/s3-currently-playing-episode-obj.json") as f:
        return json.load(f)


@pytest.fixture
def currently_playing_track_data():
    with open("fixtures/s3-currently-playing-track-obj.json") as f:
        return json.load(f)


@pytest.fixture
def cli_runner():
    return CliRunner()
