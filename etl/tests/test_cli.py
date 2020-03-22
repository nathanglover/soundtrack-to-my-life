import handlers
from cli import handler


def test_handler_does_not_exist(cli_runner):
    result = cli_runner.invoke(handler, "-H does_not_exist")
    assert type(result.exception) == ValueError
    assert str(result.exception) == "Handler does not exist in cli.py."


def test_currently_playing_handler(mocker, cli_runner):
    mocker.patch("handlers.currently_playing")
    cli_runner.invoke(handler, "-H currently_playing")
    handlers.currently_playing.assert_called_once_with(None, None, cli=True, save=False)


def test_currently_playing_handler_save(mocker, cli_runner):
    mocker.patch("handlers.currently_playing")
    cli_runner.invoke(handler, "-S -H currently_playing")
    handlers.currently_playing.assert_called_once_with(None, None, cli=True, save=True)
