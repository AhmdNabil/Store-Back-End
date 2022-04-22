import supertest from 'supertest'
import { Client } from '../../database'
import app from '../../server'

let customerToken: string
let adminToken: string

const request = supertest(app)

describe('User API endpoints', () => {
  it('Create user', async () => {
    const user = {
      username: 'customer1',
      password: 'customerpw',
      firstname: 'testfirstname',
      lastname: 'testlastname',
      role: 'customer'
    }
    const res = await request
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      expect(res.status).toBe(200)
    customerToken = res.body
  })
  it('Create admin', async () => {
    const user = {
      username: 'admin1',
      password: 'adminpassword',
      firstname: 'testadminfirstname',
      lastname: 'testadminlastname',
      role: 'admin'
    }
    const res = await request
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      expect(res.status).toBe(200)
    adminToken = res.body
  })
  it('You a customer', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `${customerToken}`)
      expect(res.status).toBe(401)
  })
  it('List of users for the admin', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
  })
  //it('User information related to presented id', async () => {
  //const res = await request
    //  .get('/api/users/4')
    //  .set('Authorization', `${customerToken}`)
    //  expect(res.status).toBe(200)
    //  expect(res.body).toEqual(jasmine.objectContaining({ id: 4, username: 'customer1', firstname: 'testfirstname', lastname: 'testlastname', role: 'customer'}))
  //})
  it('Error for customers wrong id', async () => {
    const res = await request
      .get('/api/users/5')
      .set('Authorization', `${customerToken}`)
      expect(res.status).toBe(401)
  })
  it('Have the ability to see users if you are admin', async () => {
    const res = await request
      .get('/api/users/4')
      .set('Authorization', `Bearer ${adminToken}`)
      expect(res.status).toBe(200)
  })
  //it('Update object', async () => {
  //  const user = {
   //   username: 'customer1',
    //  password: 'customerpw',
     // firstname: 'custupdatedfirstname',
     // lastname: 'testlastname',
     // role: 'customer'
    //}
    //const res = await request
     // .put('/api/users/4')
     // .send(user)
     // .set('Accept', 'application/json')
      //.set('Authorization', `${customerToken}`)
      //expect(res.status).toBe(200)
      //expect(res.body).toEqual(jasmine.objectContaining({ id: 4, username: 'customer1', firstname: 'custupdatedfirstname', lastname: 'testlastname', role: 'customer'}))
  //})
  it('Alteration', async () => {
    const user = {
      username: 'customer1',
      password: 'customerpw',
      firstname: 'custupdatedfirstname',
      lastname: 'testlastname',
      role: 'customer'
    }
    const res = await request
      .put('/api/users/5')
      .send(user)
      .set('Accept', 'application/json')
      .set('Authorization', `${customerToken}`)
      expect(res.status).toBe(401)
  })
  //it('Update user and objects', async () => {
   // const user = {
    //  username: 'customer1',
     // password: 'customerpw',
     // firstname: 'custupdatedfirstname',
     // lastname: 'adminupdatedlastname',
     // role: 'customer'
    //}
    //const res = await request
    //  .put('/api/users/4')
    //  .send(user)
    //  .set('Accept', 'application/json')
    //  .set('Authorization', `${customerToken}`)
    //  expect(res.status).toBe(200)
    //  expect(res.body).toEqual(jasmine.objectContaining({ id: 4, username: 'customer1', firstname: 'custupdatedfirstname', lastname: 'adminupdatedlastname', role: 'customer'}))
  //})
  it('Login and JWT', async () => {
    const user = { username: 'admin1', password: 'adminpassword' }
    const res = await request
      .post('/api/login')
      .send(user)
      .set('Accept', 'application/json')
      expect(res.status).toBe(200)
      expect(res.body).toBeTruthy()
  })
  //afterAll( async ()=> {
    //const conn = await Client.connect()
    //const sql = 'DELETE FROM users'
    //await conn.query(sql)
    //conn.release()
  //})
})