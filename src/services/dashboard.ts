import { Client } from "../database"
import { QueryResult } from "pg"

export class DashboardQueries {
   async userOrderNow(
       id: string
   ): Promise<{ product: string; amount: number}[]> {
       try {
           const conn = await Client.connect()
               let sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)'
               let result = await conn.query(sql, [id, 'active'])
               if (result.rows.length === 0) 
               return result.rows
               sql = 
               'SELECT name, price, order_id, amount FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_id = ($1)'
               result = await conn.query(sql, [result.rows[0].id])
               conn.release()
               return result.rows[0]
       } catch (err) {
           throw new Error(`Cant make list ${err}`)
       }
    }

async doneOrders(id:string): Promise<QueryResult[]>{
    try{
        const conn = await Client.connect()
        let sql =' SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)'
        let result = await conn.query(sql, [id, 'done'])
        if (result.rows.length === 0) return result.rows
        const results: QueryResult[] = []
        for (const row of result.rows){
            sql = 
            'SELECT name, price, order_id, amount FROM products INNER JOIN order_products ON products.id = order_products.product_id Where order_id = ($1) '
            result = await conn.query(sql, [row.id])
            if (result.rows[0] !== undefined){
                results.push(result.rows[0])
                console.log(result.rows[0])
            }
        }
        conn.release()
        return results  
    } catch(err) {
        throw new Error(`Cant make list: ${err}`)
    }
}

async sortByType(id:string): Promise<QueryResult[]> {
    try {
        const conn = await Client.connect()
        const sql =
        'SELECT products.name, price, product_types.name AS type_name FROM product_types INNER JOIN products ON product_types.id = products.type_id WHERE type_id = ($1)'
        const results: QueryResult[] = []
        const result = await conn.query(sql, [id])
        if (result.rows.length === 0) return result.rows
        for (const row of result.rows) {
            if ( row !== undefined) {
                results.push(row)
            }
        }
        conn.release()
        return results
    } catch (err) {
        throw new Error(`Cant make list : ${err}`)
    }
}
}