import { Router } from 'express'
import { OrdersProductsController } from '../controllers/OrdersProductsController.js'

const router = Router()

router.post('/', OrdersProductsController.create)
router.get('/:orderId', OrdersProductsController.findByOrder)
router.delete('/:orderId', OrdersProductsController.delete)
router.patch('/update-quantity', OrdersProductsController.updateQuantity)

export default router
