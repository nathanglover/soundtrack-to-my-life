from etl import functions


def currently_playing(event, context):
    functions.currently_playing.handler(event, context)
