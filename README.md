
# Flower Shop Backend API

  

Flower Shop Backend API built using Node.js, Express, and PostgreSQL. It allows interaction with flowers, orders, and users. More information can be found in REQUIREMENTS.md.

  

## Used Technologies

- Postgres for the database

- Node/Express for the application logic

- dotenv from npm for managing environment variables

- db-migrate from npm for migrations

- jsonwebtoken from npm for working with JWTs

- jasmine from npm for testing

  
  

## Setup

**To create the database:**

   - Open psql: `psql postgres`

   - Create a new database with the following commands:

      - `CREATE DATABASE flower_shop_dev`   [For Development]

     - `CREATE DATABASE flower_shop_test` [For Testing]

**To initialize and start the project:**

1. Run `yarn` in the terminal to install packages and dependencies.

2. Run `db-migrate up` to create the tables of the database.

3. Run `yarn start` to start the server.

4. For testing, Run `yarn test` to start testing the routes and models.

  ---

### Notes:

- All tests of the routes in the dashboard file are tested within orderSpec in routes/test.

- According to the project specification, `.env` file must be in the.`gitignore` for security. However, `.env` variables can be found below for reviewing purposes.
PGHOST='localhost'

***.env***
>     PGUSER=shop_user
>     
>     PG_TEST_USER=test_user
>     
>     PGDATABASE=flower_shop_dev
>     
>     PG_TEST_DATABASE=flower_shop_test
>     
>     PGPASSWORD=password123
>     
>     ENV=dev
>     
>     BCRYPT_PASSWORD=secret-password
>     
>     SALT_ROUNDS=10
> 
>     TOKEN_SECRET =secret-key
