import bcrypt from 'bcrypt'
import { Client } from '../database'

export type User = {
    id: number
    username: string
    firstname: string
    lastname: string
    password: string
    password_digest: string
    role: string
}
const { SALT_ROUNDS, BCRYPT_PASSWORD} = process.env

const saltRounds = SALT_ROUNDS as string
const pepper = BCRYPT_PASSWORD as string

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            console.log(err)
            throw new Error('Invalid user')
        }
    }
   async show (id: string): Promise<User> {
       try {
           const conn = await Client.connect()
           const sql = 'SELECT * FROM users WHERE id=($1)'
           const result = await conn.query(sql, [id])
           conn.release()
           if(result.rows[0] === undefined) throw 'not found'
           return result.rows[0] 
       } catch (err) {
           throw new Error(`Invalid user ${id}. Error ${err}`)
       }
   }
   async create(u: User): Promise<User> {
       try {
           const conn = await Client.connect()
           const sql = 
           'INSERT INTO users (username, password_digest, firstname, lastname, role) VALUES($1 ,$2, $3, $4, $5) RETURNING *'
           const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
           let role = 'customer'
           if(u.role === 'admin'){
               role = 'admin'
           }
           const result = await conn.query(sql, [u.username, hash, u.firstname, u.lastname, role])
           const user = result.rows[0]
           conn.release()
           delete user.password_digest
           delete user.firstname
           delete user.lastname
           return user
       } catch (err) {
           if (
               err.message === 'Key value found before "users_username_key"'
           ) {
               throw new Error(`creation failed user (${u.username}): found`)
           }
           throw new Error(`creaation failed user (${u.username}): ${err}`)
       }
   }
   async update(u: User): Promise<User> {
       try {
           const conn = await Client.connect()
           let sql = 'SELECT * FROM users WHERE id=($1)'
           let result = await conn.query(sql, [u.id])
           const foundUser = result.rows[0]
           if (foundUser === undefined) 
           throw new Error(`User id ${u.id} not found`)
           const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
           sql = 
            'UPDATE users SET username=($1), password_digest=($2), firstname=($3), lastname=($4), role=($5) WHERE id=($6) RETURNING *' 
            result = await conn.query(sql, [u.username, hash, u.firstname, u.lastname, u.role, u.id])
            const updatedUser = result.rows[0]
            conn.release()
            return updatedUser
       } catch (err) {
           throw new Error(`Update failed to (${u.username}): ${err}`)
       }
   }
   async authenticate(username: string, password: string): Promise<User | null> {
       const conn = await Client.connect()
       const sql = 
       'SELECT id, username, role, password_digest FROM users WHERE username=($1)'
       const result = await conn.query(sql, [username])
       if (result.rows.length) {
           const user = result.rows[0]
        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
            delete user.password_digest
            return user
        }    
       }
       return null
   }
}
