import click
import handlers


@click.command()
@click.option(
    "--function",
    "-f",
    prompt="function",
    help="The etl function to run, must be listed in handlers.py.",
)
@click.option(
    "--save/--no-save",
    "-s",
    default=False,
    help="Save output of handler to s3 or database (where applicable).",
)
def handler(function, save):
    handler = getattr(handlers, function, None)
    if not handler:
        msg = f"{function} not found in handlers.py"
        raise ModuleNotFoundError(msg)

    handler(None, None, cli=True, save=save)


if __name__ == "__main__":
    handler()  # pragma: no cover
