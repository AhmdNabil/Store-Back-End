//Import express
import express, { Request, Response}  from 'express'
// Import file routes
import bodyParser from 'body-parser'
import user_routes from './handlers/users'
import product_routes from './handlers/products'
import order_routes from './handlers/orders'
import dashboard_routes from './handlers/dashboards'
//Build server
const app: express.Application = express()
//Server address
const address = "localhost:3000"

app.use(bodyParser.json())
//Using app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});
//Operating server
app.get('/', function (req: Request, res: Response) {
    res.send('Done!')
})
// Router the files
user_routes(app)
product_routes(app)
order_routes(app)
dashboard_routes(app)
// Defining port
app.listen(3000, function () {
    console.log(`Done!: ${address}`)
})
// app exporting on server
export default app 