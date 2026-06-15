import { Router } from 'express'
import { TableController } from '../controllers/TableController.js'

const router = Router()

router.post('/', TableController.create)
router.get('/', TableController.findAll)
router.get('/:id', TableController.findById)
router.put('/:id', TableController.update)
router.delete('/:id', TableController.delete)

export default router
