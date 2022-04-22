// Import packages
import dotenv from "dotenv"
import { Pool } from "pg"
// Configiration
dotenv.config()
// Connect to doeenv file
const {POSTGRES_USER, POSTGRES_PASSWORD, DB, TEST_DB, HOST, ENV} = process.env 
console.log(`Datapase working ENV is ${ENV}`)
let Client:Pool
// Using testing environment
if(ENV === 'test') {
    Client = new Pool({
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    database:TEST_DB,
    host:HOST
})
}
// Developing ENV
if (ENV === 'dev')
    Client = new Pool({
    host: HOST,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    database: DB 
})
//Get client
export {Client}
