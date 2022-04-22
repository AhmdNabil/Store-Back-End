import { Order, OrderStore } from "../../models/order"

const store = new OrderStore()

describe('Model for orderend', ()=>{
    it ('Index method', ()=>{
        expect(store.index).toBeDefined()
    })
    it('Show method', ()=>{
        expect(store.index).toBeDefined()
    })
    it('Create order', ()=>{
        expect(store.index).toBeDefined()
    })
    it('Add method', ()=>{
        expect(store.addpro).toBeDefined()
    })
    it('Create and return order', async()=>{
        const order:Order=<Order>{
            status:'active',
            user_id: 1
        }
        const order2:Order=<Order>{
            status:'done',
            user_id: 1
        }
        let result = await store.create(order)
        expect(result).toEqual(jasmine.objectContaining({ status: 'active', user_id: '1' }))
            result = await store.create(order2)
            expect(result).toEqual(jasmine.objectContaining({ status: 'done', user_id: '1'})) 
    })
    it('List orders',async () => {
        const result = await store.index()
        expect(result[0].status).toEqual('done')
        expect(result[1].status).toEqual('done')
        expect(result[2].status).toEqual('active')
        expect(result[3].status).toEqual('done')
    })
    it('Order back', async()=>{
        const result = await store.show('2')
        expect(result.status).toEqual('done')
    })
    it ('Add prroduct returns', async()=>{
        const result = await store.addpro(6, '3', '1')
        expect(result).toEqual(jasmine.objectContaining({
              id: 2,
              amount: 6,
              product_id: '1',
              order_id: '3'
            }))
    })
})