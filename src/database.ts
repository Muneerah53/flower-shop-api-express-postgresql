import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PG_TEST_USER, PG_TEST_DATABASE} = process.env;

let db: Pool;

if(process.env.ENV == 'test'){
    db = new Pool({
       host: PGHOST,
       user: PG_TEST_USER,
       database: PG_TEST_DATABASE,
       password: PGPASSWORD,
   });}

else{
 db = new Pool({
    host: PGHOST,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
});}



export default db;