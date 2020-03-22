from etl import functions


def currently_playing(event, context):
    return functions.currently_playing.handler(event, context)