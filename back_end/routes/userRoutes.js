import express from 'express'
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import {
  registerValidationRules,
  loginValidationRules,
  validate,
} from '../middleware/validation.js'

const router = express.Router()

router.post('/register', registerValidationRules(), validate, registerUser)
router.post('/login', loginValidationRules(), validate, loginUser)
router.post('/logout', protect, logoutUser)
router.get('/profile', protect, getUserProfile)

export default router