import sys

import click
import handlers


def currently_playing(save=False):
    handlers.currently_playing(None, None, save)


@click.command()
@click.option(
    "--handler",
    "-H",
    prompt="Handler",
    help="The etl handler to run, must be listed in handlers.py.",
)
@click.option(
    "--save/--no-save",
    "-S",
    default=False,
    help="Save output of handler to s3 or database (where applicable).",
)
def handler(handler, save):
    handler = getattr(sys.modules[__name__], handler)
    handler(save=save)


if __name__ == "__main__":
    handler()
