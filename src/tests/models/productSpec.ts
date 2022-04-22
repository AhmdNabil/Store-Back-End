import { Product, ProductStore } from "../../models/product"

const store = new ProductStore()

describe('Model to product', ()=>{
    it('Index', ()=>{
    expect(store.index).toBeDefined()
})
it("show", ()=>{
    expect(store.index).toBeDefined()
})
it('create', ()=>{
    expect(store.index).toBeDefined()
})
it('Back products', async()=>{
    const product: Product =<Product>{
        name: 'producttester3',
        price: 300,
        type_id: 2
    }
    const product2: Product =<Product>{
        name: 'producttester4',
        price:400,
        type_id: 2
    }
    let result = await store.create(product)
    expect(result).toEqual(jasmine.objectContaining({ name: 'producttester3', price: '300', type_id: '2' }))
    result = await store.create(product2)
    expect(result).toEqual(jasmine.objectContaining({ name: 'producttester4', price:'400', type_id: '2' }))
})
it('products List', async()=>{
    const result = await store.index()
    expect(result[3].name).toEqual('producttester3')
    expect(result[4].name).toEqual('producttester4')
})
it('Right product', async()=>{
    const result = await store.show('4')
    expect(result).toEqual(jasmine.objectContaining({ id: 4,name: 'producttester3', price: '300', type_id: '2' }))
})
})
