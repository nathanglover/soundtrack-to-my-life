import sentry_sdk
from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration


def init_sentry(cli=False):
    if cli:
        return

    sentry_sdk.init(
        dsn="https://4175d6ab3b194673953ec8fb87d1afde@sentry.io/2153273",
        integrations=[AwsLambdaIntegration()],
    )
