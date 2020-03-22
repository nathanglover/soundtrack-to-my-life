# ETL - Soundtrack to My Life

## CLI

python cli.py

Used to run serverless functions within the etl package. Does not initialize sentry.

### Options

#### --handler

The etl handler to run, must be listed in handlers.py.

- TEXT
- -H
- Raises `ValueError` if provided handler does not exist

#### --save/--no-save

Save output of handler to s3 or database (where applicable).

- Boolean option defaults to False (no save).
- -S

### Examples

#### currently_playing

```shell
python cli.py -H currently_playing
python cli.py --save --handler currently_playing
```

## Testing

The following commands can be used to test the etl module.

### pytest

- From the root etl directory (`soundtrack-to-my-life\etl`) run `python -m pytest`.
  Sample Output:

```shell
====================================================== test session starts ======================================================
platform win32 -- Python 3.8.1, pytest-5.4.1, py-1.8.1, pluggy-0.13.1
rootdir: C:\Users\nlglo\development\soundtrack-to-my-life\etl
plugins: cov-2.8.1, mock-2.0.0
collected 2 items

etl\tests\test_config.py ..                                                                                                [100%]

======================================================= 2 passed in 1.78s =======================================================
```

### pytest with coverage

- For coverage run `python -m pytest --cov=.`. Sample Output:

```shell
====================================================== test session starts ======================================================
platform win32 -- Python 3.8.1, pytest-5.4.1, py-1.8.1, pluggy-0.13.1
rootdir: C:\Users\nlglo\development\soundtrack-to-my-life\etl
plugins: cov-2.8.1, mock-2.0.0
collected 2 items

etl\tests\test_config.py ..                                                                                                [100%]

----------- coverage: platform win32, python 3.8.1-final-0 -----------
Name                                 Stmts   Miss  Cover
--------------------------------------------------------
cli.py                                  16      7    56%
etl\auth.py                             46     32    30%
etl\config.py                            6      0   100%
etl\conftest.py                          0      0   100%
etl\functions\currently_playing.py      60     45    25%
handlers.py                              5      2    60%
--------------------------------------------------------
TOTAL                                  133     86    35%


======================================================= 2 passed in 2.65s =======================================================
```

### pytest with coverage and html report

- For HTML coverage report run `python -m pytest --cov=. --cov-report=term --cov-report=html`.
  - Output is the same as the above.
  - HTML report can be found here `soundtrack-to-my-life/etl/htmlcov/index.html`
