## Setup venv
`py -m venv venv`

## Activate venv :

`venv\Scripts\activate`

### If error, run this as administrator in powershell

`set-executionpolicy unrestricted`

## Install flask
`pip install flask`

## Start server
`$env:FLASK_APP = "app"`

`$env:FLASK_ENV = "development"`
`flask run`