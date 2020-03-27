import pytest
from click.testing import CliRunner


@pytest.fixture
def currently_playing_data():
    return {
        "timestamp": 1584885689675,
        "item": {
            "album": {"name": "Aviscerall",},
            "artists": [{"name": "Aviscerall",}],
            "name": "Lullabyes",
        },
        "currently_playing_type": "track",
        "is_playing": True,
    }


@pytest.fixture
def cli_runner():
    return CliRunner()
