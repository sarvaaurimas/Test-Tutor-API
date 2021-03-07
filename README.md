Test And Tutor
======================

# Installation
## Pre Requisits
Installation of the APIs requires an environment with Postgresql installed and nodejs. The node.js instance must have free access to query the database (i.e. firewalls opened).

## Environment set up
To set up the environment apply the following steps:
1. Confirm the database is up and running.
2. Download the repo to the nodejs environment 
3. Create a .env file with at least the following parameters:

`TIMEOUT=120`
`SECRET=my_secret`
`PORT=3000`
`DB_NAME=Test_And_Tutor`
`DB_USER=postgres`
`DB_PASSWORD=my_password`
`DB_HOST=localhost`
`DB_PORT=5432`
`SCHEMA=public`

## Node install
Once the environment is set up, install all the nodejs dependencies by running
`npm install`

# Running the APIs
To run the APIs run the following command:
`node app.js`

## Development server
Run `npm run dev` for a dev server. The app will automatically reload if you change any of the files`
