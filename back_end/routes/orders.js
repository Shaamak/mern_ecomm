import express from 'express'
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
import { orderValidationRules, validate } from '../middleware/validation.js'

const router = express.Router()

router
  .route('/')
  .post(protect, orderValidationRules(), validate, addOrderItems)

router.route('/myorders').get(protect, getMyOrders) // New route

router.route('/:id').get(protect, getOrderById)

export default router