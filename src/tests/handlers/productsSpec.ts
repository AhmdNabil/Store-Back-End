import supertest from 'supertest'
import app from '../../server'

let adminToken: string

const request = supertest(app)

describe('Product endpoints', () => {
  beforeAll(async () => {
    const user = {
      username: 'adminproduct',
      password: 'pwadmin',
      firstname: 'adminfirstproduct',
      lastname: 'adminlastproduct',
      role: 'admin'
    }
    const res = await request
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      expect(res.status).toBe(200)
    adminToken = res.body
  })
  it('Create product', async () => {
    const product = { name: 'testproduct1', price: 100, type_id: '1' }
    const product2 = { name: 'testproduct2', price: 200, type_id: '1' }
    let res = await request
      .post('/api/products')
      .send(product)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
    res = await request
      .post('/api/products')
      .send(product2)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
  })
  it('products list', async () => {
    const res = await request.get('/api/products')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([
      { id: 1, name: 'orderproducttesting1', price: '150' , details: null, url: null, type_id: '1' },
      { id: 2, name: 'testproduct1', price: '100', details: null, url: null, type_id: '1' },
      { id: 3, name: 'testproduct2', price: '200', details: null, url: null, type_id: '1' }
    ])
  })
  //it('In request', async () => {
    //const res = await request.get('/api/products/2')
    //expect(res.status).toBe(200)
    //expect(res.body).toEqual({ id: 2, name: 'testproduct1', price: 100, details: null, url: null, type_id: '1' })
  //})
})