import { Router } from 'express'
import { OrderController } from '../controllers/OrderController.js'

const router = Router()

router.post('/', OrderController.create)
router.get('/', OrderController.findAll)
router.get('/:id', OrderController.findById)
router.put('/:id', OrderController.update)
router.delete('/:id', OrderController.delete)

export default router
