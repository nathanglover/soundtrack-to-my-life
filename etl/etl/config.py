import json

import boto3
import pymongo
import sentry_sdk
from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration

BUCKET_NAME = "spotify-api"
USER_ID = "125242111"

client = boto3.client("ssm")


def init_sentry(cli=False):
    if cli:
        return

    sentry_sdk.init(
        dsn="https://4175d6ab3b194673953ec8fb87d1afde@sentry.io/2153273",
        integrations=[AwsLambdaIntegration()],
    )


def get_secrets():
    parameter_name = "soundtrack-to-my-life-secrets"
    response = client.get_parameter(Name=parameter_name, WithDecryption=True)
    data = json.loads(response["Parameter"]["Value"])
    return data


def get_mongodb_client():
    secrets = get_secrets()
    user = secrets["db"]["user"]
    password = secrets["db"]["password"]
    host = secrets["db"]["host"]
    return pymongo.MongoClient(f"mongodb+srv://{user}:{password}@{host}")
