import { body, validationResult } from 'express-validator'

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const orderValidationRules = () => {
  return [
    body('address', 'Address is required').not().isEmpty(),
    body('items', 'Cart items cannot be empty').isArray({ min: 1 }),
    body('totalAmount', 'Total amount is required').isNumeric(),
  ]
}

const registerValidationRules = () => {
  return [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ]
}

const loginValidationRules = () => {
  return [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ]
}

export {
  validate,
  orderValidationRules,
  registerValidationRules,
  loginValidationRules,
}