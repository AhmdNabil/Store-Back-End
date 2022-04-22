#### Install Packages
- Clone this repo
- To install packages and dependencies Run 'npm install'


#### .env file
POSTGRES_USER=store_user
POSTGRES_PASSWORD="password"
DB=anime_dev
TEST_DB=anime_test
PORT=5432
HOST=127.0.0.1
ENV=dev
BCRYPT_PASSWORD=<STRING>
SALT_ROUNDS=10
TOKEN_SECRET=<STRING>

#### DB-Setup
-switch to the postgres user su postgres
-start psql psql postgres
-in psql run the following:
-CREATE USER store_user WITH PASSWORD "password";
-CREATE DATABASE anime_dev;
-\c anime_dev
-GRANT ALL PRIVILEGES ON DATABASE anime_dev TO store_user;
-Test DB working run \dt and it should output "No relations found."

#### Create database
-CREATE DATABASE anime_dev
#### Create user
- CREATE USER store_user WITH PASSWORD "password";
#### DATABASE GRANT
-GRANT ALL PRIVILEGES ON DATABASE animr_dev TO store_user
-GRANT ALL PRIVILEGES ON DATABASE animr_test TO store_user


postgres will listen on 5432

#### Commands
-To start tsc-watch and rebuild on any changes 'npm run watch'
-To  run migrate-db for the dev environment 'npm run migrate'
-To run migrate-db for the test environment 'npm run migrate-test'
-To run the jasmine testing framework 'npm run test'
-To compile the TypeScript code into JavaScript in the ./dist directory 'npm run build' - 
-To run nodemon and restart the server on any change to the TypeScript source code 'npm run start'
-To execute prettier and reformat the code according to the prettier configuration 'npm run prettier'
-To run eslint and return any linting errors 'npm run lint'

#### API 
port 3000
Details REQUIREMENT.md File

#### WORK SPACE LINK
https://r1055471c1124826xjupyterlj8dqpxyk.udacity-student-workspaces.com/files/workspace_archive.tar?_xsrf=2%7C03802bc7%7Cc1dcae18e3391fd4a1367e44700d6d21%7C1646518008