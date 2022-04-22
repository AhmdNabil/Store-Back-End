//Importing packages , productmodels, authentication
//Function to show ,add, update ,create 
//connecting to routes
import express, { Request, Response } from "express"
import {Product, ProductStore} from '../models/product'
import { verifyAuthToken, verifyAdminToken} from '../middleware/authenticate'

const store = new ProductStore()

const index = async (_req:Request, res:Response) => {
    try{
        const products = await await store.index()
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json(`Error: ${err.message}`)
    }
}

const show =async (req: Request, res:Response) => {
    try {
        const product = await store.show(req.params.id)
        res.json(product)
    } catch (err) {
        res.status(401)
        res.json(`Error: ${err.message}`)
    }
}

const create =async (req:Request, res:Response) => {
    const product: Product = <Product>{
        name: req.body.name,
        price: req.body.price,
        type_id: req.body.type_id,
        details: req.body.details,
        url: req.body.url
    }
    try{
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err.message)
    }
}

const createType = async (req:Request, res:Response) => {
    try {
        const newType = await store.createType(req.body.name)
        res.json(newType)
    } catch (err) {
        res.status(400)
        res.json(err.message)
    }
}

const product_routes = (app: express.Application) => {
    app.get('/api/products', index)
    app.get('/api/product/:id', show)
    app.post('/api/products', verifyAuthToken, verifyAdminToken, create)
    app.post('/api/products/type', verifyAuthToken, verifyAdminToken, createType)
}

export default product_routes