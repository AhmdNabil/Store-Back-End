//Importing packages , jwts
//Define the role of user and authorization
//connecting to routes
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const verifyAuthToken =(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1] as string
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch (err) {
        res.status(401)
        res.json('Incorrect authorizatin')
    }
}

export const verifyAdminToken = (
    req:Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1] as string
        const decoded = jwt.decode(token, {json: true})
        if (decoded?.user.role !== 'admin')
        throw 'Unknown token role'
        next()
    } catch (err) {
        res.status(401)
        res.json(`Wrong token: ${err}`)
    }
}

export const addRole = (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1] as string
        const decoded = jwt.decode(token, {json:true})
        res.locals.role = decoded?.user.role
        res.locals.id = decoded?.user.id
        next()
    } catch (err) {
        res.status(400)
        res.json(`Analyzing failed: ${err}`)
    }
}