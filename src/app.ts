import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import productRoutes from './presentation/routes/productRoutes.js'
import tableRoutes from './presentation/routes/tableRoutes.js'
import orderRoutes from './presentation/routes/orderRoutes.js'
import ordersProductsRoutes from './presentation/routes/ordersProductsRoutes.js'
import ordersWithProducts from './presentation/routes/orderWithProductsRoutes.js'

const app: Application = express()

// settings
app.set('port', process.env.PORT || 5000)
app.set('json spaces', 2)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())

// routes
app.use('/api/products', productRoutes)
app.use('/api/tables', tableRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/orders-products', ordersProductsRoutes)
app.use('/api/orders-with-products', ordersWithProducts)

export default app
