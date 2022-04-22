import supertest from "supertest"
import app from "../../server"

let adminToken: string

const request = supertest(app)

describe('Dashboard API endpoints', ()=>{
    beforeAll(async ()=>{
        const user = {
            username: 'admindash',
            password: 'pwdash',
            firstname: 'firstnamedash',
            lastname: 'lastnamedash',
            role: 'admin'
        }
        const res = await request
        .post('/api/users')
        .send(user)
        .set('Accept', 'application/json')
        expect(res.status).toBe(200)
        adminToken = res.body
    })
    it('Products in cart', async()=>{
        const res = await request
        .get('/api/dashboard/cart')
        .set('Authorization', `Bearer ${adminToken}`)
        expect(res.status).toBe(200)
    })
    //it('Prodcts in cart for order', async()=>{
      //  const res = await request
        //.get('/api/dasboard/orders/1')
        //.set('Authorization', `Bearer ${adminToken}`)
        //expect(res.status).toBe(200)
    //})
    it ('Products in the types', async()=>{
        const res = await request.get('/api/dashboard/sort-by-type/1')
        expect(res.status).toBe(200)
    })
})