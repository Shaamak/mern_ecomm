import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { address, items, totalAmount } = req.body

  if (items && items.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  const order = new Order({
    user: req.user._id, // Link to logged-in user
    customerName: req.user.name, // Get from user token
    email: req.user.email, // Get from user token
    address,
    items,
    totalAmount,
  })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export { addOrderItems, getOrderById, getMyOrders }