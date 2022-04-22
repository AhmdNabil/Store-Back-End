// Importing packager, dashboard service , authentication
// making cart
// Define done orders
//Sorting objects
// connecting to routes
import express, { Request, Response } from 'express'
import {DashboardQueries} from '../services/dashboard'
import {addRole , verifyAuthToken} from '../middleware/authenticate'

const dashboard = new DashboardQueries()

const userCart =async (_req: Request, res:Response) => {
    try{
        const userId = res.locals.id.toString()
        const items = await dashboard.userOrderNow(userId)
        res.json(items)
    } catch (err) {
        res.status(404)
        console.log(err)
        res.json(`Error ${err.message}`)
        return
    }
}

const doneOrders =async (_req:Request , res:Response) => {
    try {
        if (
            res.locals.role === 'customer' &&
            _req.params.id !== res.locals.id.toString()
        )
        throw new Error('Only done orders')
        if (res.locals.role !== 'customer' &&
        res.locals.role !== ' admin')
        throw new Error('Incorrect role' )
        const orders = await dashboard.doneOrders(_req.params.id)
        res.json(orders)
    } catch (err) {
        res.status(401)
        console.log(res.locals.role)
        console.log(err.message)
        res.json(`Error: ${err.message}`)
    }
}

const sortByType =async (_req:Request, res:Response) => {
    try {
        const products = await dashboard.sortByType(_req.params.id)
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json(`Error: ${err.message}`)
    }
}

const dashboard_routes = (app: express.Application) => {
    app.get('/api/dashboard/cart', verifyAuthToken, addRole, userCart)
    app.get('/api/dashboard/orders/:id', verifyAuthToken, addRole , doneOrders)
    app.get('/api/dashboard/sort-by-type/:id', sortByType)
}

export default dashboard_routes