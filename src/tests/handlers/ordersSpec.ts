import supertest from 'supertest'
import app from '../../server'

let adminToken: string

const request = supertest(app)

describe('Order endpoints', () => {
  beforeAll(async () => {
    const user = {
      username: 'adminorder',
      password: 'pworder',
      firstname: 'orderfirst',
      lastname: 'orderlast',
      role: 'admin'
    }
    let res = await request
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
    adminToken = res.body
    res = await request
      .post('/api/products/type')
      .send({ name: 'poster' })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
    res = await request
      .post('/api/products/type')
      .send({ name: 'bags' })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
    const product = { name: 'orderproducttesting1', price: 150, type_id: '1' }
    res = await request
      .post('/api/products')
      .send(product)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
  })
  it('Order creation', async () => {
    const order = { status: 'active', user_id: '1' }
    const order2 = { status: 'done', user_id: '1' }
    let res = await request
      .post('/api/orders')
      .send(order)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
    res = await request
      .post('/api/orders')
      .send(order2)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
  })
  it('Orders list', async () => {
    const res = await request
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
  })
  it('Order inprogress', async () => {
    const res = await request
      .get('/api/orders/1')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ id:1, status:'active', user_id:'1'})
  })
  it('Add to order', async () => {
    const product_order = { order_id: '1', product_id: '1', amount: 1 }
    const res = await request
      .post('/api/orders/1/products')
      .send(product_order)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
      expect(res.body).toEqual({id: 1, order_id: '1', product_id: '1', amount: 1})
  })
  it('Update objects in order', async () => {
    const res = await request
      .put('/api/orders/1')
      .send({ id: 1, status: 'done', user_id: '1' })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
      expect(res.body).toEqual(jasmine.objectContaining({ id:1, status: 'done', user_id: '1'}))
})
})