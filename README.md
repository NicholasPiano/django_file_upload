The application is in two parts: `client` and `server`. The client is a React application. The server is written using Django.

The value `$ROOT_DIR` refers to the directory containing this file.

# Client installation

1. `~$ cd $ROOT_DIR/client`
2. Install Yarn: https://classic.yarnpkg.com/en/docs/install/#mac-stable

Yarn version: 1.22.4
Node version: 14.5.0
NPX version: 6.14.5

3. Install application dependencies

`~$ yarn`

4. Run application

`~$ yarn start`

# Server installation

Python version: 3.8.3

1. `~$ cd $ROOT_DIR/server`
2. Create virtualenv

`~$ python3.8 -m venv .`

3. Activate virtualenv

`~$ source ./bin/activate`

4. Install dependencies

`~$ pip install -r requirements.txt`

5. Run migrations

`~$ python manage.py migrate`

6. Run application

`~$ python manage.py runserver`

# Application usage

## Login and register

There is no session caching to allow easy local testing of different user accounts.
