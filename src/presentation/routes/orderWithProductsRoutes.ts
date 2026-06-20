import { Router } from 'express'
import { OrderWithProductsController } from '../controllers/OrderWithProductsController.js'

const router = Router()

router.post('/', OrderWithProductsController.create)

export default router
