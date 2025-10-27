import express from 'express'
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
// (Add createProduct, etc. and validation if you implement them)

const router = express.Router()

router.route('/').get(getProducts)
// .post(protect, admin, createProduct) // Example

router.route('/:id').get(getProductById)
// .put(protect, admin, updateProduct) // Example

export default router