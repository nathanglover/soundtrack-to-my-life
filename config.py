import sentry_sdk
from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration

sentry_sdk.init(
    dsn="https://4175d6ab3b194673953ec8fb87d1afde@sentry.io/2153273",
    integrations=[AwsLambdaIntegration()],
)


import logging
import sys

logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
