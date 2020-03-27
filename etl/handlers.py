from etl.config import init_sentry
from etl import functions


def currently_playing(event, context, cli=False, save=True):
    init_sentry(cli)
    return functions.currently_playing.handler(event, context, save=save)


def insert_timeline_documents(event, context, cli=False, save=True):
    init_sentry(cli)
    return functions.insert_timeline_documents.handler(event, context, save=save)
