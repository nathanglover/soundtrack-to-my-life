import sentry_sdk
from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration

import etl
from etl.config import init_sentry, get_secrets, get_mongodb_client


def test_init_sentry(mocker):
    mocker.patch("sentry_sdk.init")
    init_sentry()
    sentry_sdk.init.assert_called_once()


def test_init_sentry_cli(mocker):
    mocker.patch("sentry_sdk.init")
    init_sentry(cli=True)
    sentry_sdk.init.assert_not_called()


def test_get_secrets(mocker):
    res = {"Parameter": {"Value": '{"k": "v"}'}}
    mocker.patch("etl.config.client.get_parameter", return_value=res)
    secrets = get_secrets()
    assert etl.config.client.get_parameter.called_once_with(
        Name="soundtrack-to-my-life-secrets", WithDecryption=True
    )
    assert secrets["k"] == "v"


def test_get_mongodb_client(mocker):
    secrets = {"db": {"user": "user1", "password": "xxxxx", "host": "example.com"}}
    mocker.patch("etl.config.get_secrets", return_value=secrets)
    mocker.patch("etl.config.pymongo.MongoClient")
    get_mongodb_client()
    etl.config.pymongo.MongoClient.assert_called_once_with(
        f'mongodb+srv://{secrets["db"]["user"]}:{secrets["db"]["password"]}@{secrets["db"]["host"]}'
    )
