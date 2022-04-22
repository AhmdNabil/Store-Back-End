import { Client } from "../database"

export type Product = {
    id: number
    name: string
    price: number
    type_id: number
    details: string
    url: string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            console.log(err)
            throw new Error("No products")
        }
    }
async show(id: string): Promise<Product> {
    try {
        const conn = await Client.connect()
        const sql = ' SELECT * FROM products WHERE id=($1)'
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`No product ${id}. Error: ${err}`)
    }
}
async create(p: Product): Promise<Product> {
    try{
        const conn = await Client.connect()
        const sql =
        'INSERT INTO products (name, price, type_id, details, url) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const result = await conn.query(sql, [p.name, p.price, p.type_id, p.details, p.url])
    const product = result.rows[0]
    conn.release()
    return product
    } catch (err) {
        throw new Error(`Adding failed ${p.name}. Error ${err}`)
    }
}
async createType(name: string): Promise<{id: string; name: string}> {
    try {
        const conn = await Client.connect()
        const sql =
        'INSERT INTO product_types (name) VALUES ($1) RETURNING *'
        const result = await conn.query(sql, [name])
        const type = result.rows[0]
        conn.release()
        return type
    } catch (err) {
        throw new Error(`Creation failed to type ${name}. Error ${err}`);
    }
}
}
