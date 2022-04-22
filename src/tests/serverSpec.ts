// importing packages
import supertest from 'supertest'
//Server app
import app from '../server'
// Request app
const request = supertest(app)
// Test the server api endpoint
describe('Testing API', ()=>{
    it('API "/" return status 200',async ()=>{
        const res = await request.get('/')
        expect(res.status).toBe(200)
    })
})