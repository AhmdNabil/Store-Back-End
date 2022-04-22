import { DashboardQueries } from "../../services/dashboard"
import { Order, OrderStore } from "../../models/order"

const store = new DashboardQueries()
const orderStore = new OrderStore()

describe('Services', ()=> {
    beforeAll(async ()=>{
        const order: Order = <Order>{
            status: 'active', 
            user_id: 1
        }
        const order2: Order = <Order>{
            status: 'active',
            user_id: 1,
        }
        const closed: Order =<Order>{
            status: 'done',
            user_id: 1,
            id: 6
        }
        let result = await orderStore.create(order)
        expect(result).toEqual(jasmine.objectContaining({ status: 'active', user_id: '1' }))
        result = await orderStore.create(order2)
        expect(result).toEqual(jasmine.objectContaining({ status: 'active', user_id: '1' }))
        const current = await orderStore.addpro(5, '5', '1')
        const completed = await orderStore.addpro(5, '6', '1')
        expect(current).toEqual(jasmine.objectContaining({ id: 3, amount: 5, product_id: '1', order_id: '5'}))
        expect(completed).toEqual(jasmine.objectContaining({ id: 4, amount: 5, product_id: '1', order_id: '6'}))
        result = await orderStore.update(closed)
        expect(result).toEqual(jasmine.objectContaining({ status: 'done', user_id: '1' }))
    })
    it ('Current order', ()=>{
        expect(store.userOrderNow).toBeDefined()
    })
    it ('Done orders', ()=>{
        expect(store.doneOrders).toBeDefined()
    })
    it ('Cart for current order', async()=>{
        const result = await store.userOrderNow('1')
        expect(result).toEqual(jasmine.objectContaining({ name: 'orderproducttesting1', price: '150' , order_id: '3', amount: 6}))
    })
    it ('Cart complete', async()=>{
        const result = await store.doneOrders('1')
        expect(result[0]).toEqual(jasmine.objectContaining({ name: 'orderproducttesting1', price: '150' , order_id: '1', amount: 1}))
    })
    it ('Chosing by type', async()=>{
        const result = await store.sortByType('1')
        expect(result[0]).toEqual(jasmine.objectContaining({ name: 'orderproducttesting1', price: '150', type_name: 'poster' }))
    })
})
