import { Client } from '../../database'
import { User, UserStore} from '../../models/user'

const store = new UserStore

describe("User Model", ()=>{
    it('Index', ()=>{
        expect(store.index).toBeDefined()
    })
    it('Create', ()=>{
        expect(store.index).toBeDefined()
    })
    it('Show', ()=>{
        expect(store.index).toBeDefined
    })
    it('Update', ()=>{
        expect(store.index).toBeDefined()
    })
    it('Add', async()=>{
        const user: User =<User>{
            username:'usertesting',
            password:'passwordtesting',
            firstname:'firstnameTesting',
            lastname:'lastnametesting',
            role:'admin'
        }
        const user2: User=<User>{
            username:'usertesting2',
            password:'passwordtesting2',
            firstname:'firstnametesting2',
            lastname:'lastnametesting2',
            role:'customer'
        }
        let result = await store.create(user)
        expect(result).toEqual(jasmine.objectContaining({ username:'usertesting', role:'admin' }))
        result = await store.create(user2)
        expect(result).toEqual(jasmine.objectContaining({ username:'usertesting2', role:'customer' }))
    })
        it('Users list', async()=>{
            const result = await store.index()
            expect(result[5].firstname).toEqual('firstnameTesting')
            expect(result[6].firstname).toEqual('firstnametesting2')
        })
        it('Valid user', async()=>{
            const result = await store.show('6')
            expect(result).toEqual(jasmine.objectContaining({ id: 6, username: 'usertesting', role: 'admin' }))
        })
        it('User updated', async()=>{
            const user: User = <User>{
                id: 7,
                username:'usertesting2',
                password:'passwordtesting2',
                firstname:'firstnameupdating',
                lastname:'lastnametesting2',
                role:'customer'
            }
            const result= await store.update(user)
            expect(result).toEqual(jasmine.objectContaining({ id: 7, username:'usertesting2', firstname:'firstnameupdating', lastname:'lastnametesting2', role:'customer' }))
        })
        it('Authentication success', async()=>{
            const result = await store.authenticate('usertesting2', 'passwordtesting2')
            expect(result).toEqual(jasmine.objectContaining({ id:7, username: 'usertesting2', role: 'customer' }))
        })
//afterAll( async () => {
//cleanup users in testing db
//const conn = await Client.connect()
//const sql = 'DELETE FROM users '
//await conn.query(sql)
//conn.release()
//})
})
