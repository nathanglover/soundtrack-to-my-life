from etl import functions


def currently_playing(event, context, save=True):
    return functions.currently_playing.handler(event, context, save)
