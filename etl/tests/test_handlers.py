import handlers


def test_currently_playing(mocker):
    mocker.patch("handlers.init_sentry")
    mocker.patch("handlers.functions.currently_playing.handler")
    handlers.currently_playing(None, None, cli=False, save=True)
    handlers.init_sentry.assert_called_once_with(False)
    handlers.functions.currently_playing.handler.assert_called_once_with(
        None, None, save=True
    )
