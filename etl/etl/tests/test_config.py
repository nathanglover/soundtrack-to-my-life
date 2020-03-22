import sentry_sdk
from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration
from etl.config import init_sentry


def test_init_sentry(mocker):
    mocker.patch("sentry_sdk.init")
    init_sentry()
    sentry_sdk.init.assert_called_once()


def test_init_sentry_cli(mocker):
    mocker.patch("sentry_sdk.init")
    init_sentry(cli=True)
    sentry_sdk.init.assert_not_called()
