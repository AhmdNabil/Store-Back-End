//Importing packages , usermodels, authentication
//Function to show ,add, update ,create , authenticate
//connecting to routes
import express, { Request, Response } from "express";
import {User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import { verifyAuthToken, verifyAdminToken, addRole } from '../middleware/authenticate'

const store = new UserStore()

const index = async (_req:Request, res:Response)=> {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(400)
        res.json(`Error: ${err.message}`)
    }
}

const show =async (req:Request, res:Response) => {
    try{
        if (res.locals.role === 'customer'){
            if (res.locals.id.toString() === req.params.id){
                const user = await store.show(req.params.id)
                res.json(user)
            } else {
                throw new Error ('Only ur own acc')
            } 
        } else if (res.locals.role === 'admin') {
            const user = await store.show(req.params.id)
            res.json(user)
        } else {
            throw new Error ('Incorrect role in tokens')
        }
    } catch(err) {
        res.status(401)
        res.json(`Error: ${err.message}`)
    }
}

const create = async (req: Request, res: Response)=> {
    const user: User = <User>{
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role
    }
    try{
        const newUser = await store.create(user)
        const token = jwt.sign(
            {user: newUser},
            process.env.TOKEN_SECRET as string
        )
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err.message)
    }
}

const update = async (req: Request, res: Response)=> {
    const user: User =<User>{
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role
    }
    try {
        if (res.locals.role === 'customer'){
            if (user.role !== 'customer')
            throw new Error('Not updateable')
            if (res.locals.id.toString() === req.params.id) {
                const updated = await store.update(user)
                res.json(updated)
            } else {
                throw new Error ('Update ur acc')
            }
        } else if (res.locals.role === 'admin') {
            const updated = await store.update(user)
            res.json(updated)
        } else {
            throw new Error('Incorrect ')
        }
    } catch (err){
        res.status(401)
        res.json(`Error: ${err.message}`)
    }
}

const authenticate = async (req:Request, res:Response)=>{
    const user: User = <User>{
        username:req.body.username,
        password:req.body.password
    }
    try{
        const u = await store.authenticate(user.username, user.password)
        if (u === null){
            throw new Error ('Undefined')
        }
        const token =jwt.sign({ user: u }, process.env.TOKEN_SECRET as string)
        res.json(token)
    } catch(err){
        res.status(401)
        res.json('Undefined')
    }
}

const user_routes = (app: express.Application) => {
    app.get('/api/users', verifyAuthToken, verifyAdminToken, index)
    app.get('/api/users/:id', verifyAuthToken, addRole, show)
    app.post('/api/users', create)
    app.put('/api/users/:id', verifyAuthToken, addRole, update)
    app.post('/api/login',authenticate)
}

export default user_routes