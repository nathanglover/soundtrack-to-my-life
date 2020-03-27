import handlers
from cli import handler


def test_function_does_not_exist(cli_runner):
    result = cli_runner.invoke(handler, "-f does_not_exist")
    assert type(result.exception) == ModuleNotFoundError


def test_call_handler(mocker, cli_runner):
    mocker.patch("handlers.currently_playing")
    cli_runner.invoke(handler, "-f currently_playing")
    handlers.currently_playing.assert_called_once_with(None, None, cli=True, save=False)
