import { Client } from "../database"

export type Order ={
    id: number
    status: string
    user_id: number
}

export class OrderStore {
    async index (): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            console.log(err)
            throw new Error ('No order')
        }
    }
async show(id: string): Promise<Order> {
    try {
        const conn = await Client.connect()
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`No order ${id}. Erorr:${err}`)
    }
}
async update (o:Order): Promise<Order> {
    try {
        const conn = await Client.connect()
        const sql = 'UPDATE orders SET status =($1) WHERE id= ($2) RETURNING *'
        const result = await conn.query(sql, [o.status, o.id])
        const order = result.rows[0] as Order
        conn.release()
        return order
    } catch (err) {
        throw new Error(`Update failed ${o.id}. Error ${err}`);
    }
}
async create (o:Order): Promise<Order> {
    try{
        const conn = await Client.connect()
        const sql = 
         'INSERT INTO orders (status , user_id) VALUES ($1, $2) RETURNING *'
        const result = await conn.query(sql, [o.status, o.user_id])
        const order = result.rows[0] as Order
        conn.release()
        return order
    } catch (err) {
        throw new Error(`failed to add ${o.user_id}}. Error ${err}`)
    }
}
async addpro(
    amount: number,
    orderId : string,
    productId: string
): Promise<Order> {
    try{
        const orderSql = 'SELECT * FROM orders WHERE id= ($1)'
        const conn = await Client.connect()
        const result = await conn.query(orderSql, [orderId])
        const order = result.rows[0]
        if (order.status !== 'active') {
            throw new Error(`Addition failed to ${productId} to order ${orderId} because status is ${order.status}`)
        }
        conn.release()
     } catch (err) {
         throw new Error(`${err}`)
     }
     try {
         const conn= await Client.connect()
         let sql = 'SELECT * FROM order_products WHERE order_id = ($1) AND product_id = ($2)'
         let result = await conn.query(sql, [orderId, productId])
         const found = result.rows[0]
         if (found) {
             sql = 'UPDATE order_products SET amount=($1) WHERE order_id =($2) AND product_id =($3) RETURNING *'
            result = await conn.query(sql, [amount, orderId, productId])
            const order = result.rows[0]
            conn.release()
            return order
         } else {
             sql = 'INSERT INTO order_products (amount, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            result = await conn.query(sql, [amount, orderId, productId])
            const order = result.rows[0]
            conn.release()
            return order 
         }
    } catch (err){
        throw new Error(`Addition failed to ${productId} to order ${orderId}: ${err}`)
    }
}    
}