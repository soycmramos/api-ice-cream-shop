import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import productRoutes from './presentation/routes/productRoutes.js'

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

export default app
