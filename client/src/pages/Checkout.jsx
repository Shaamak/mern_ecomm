import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const placeOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData)
  return data
}

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { userInfo } = useAuth()
  const [address, setAddress] = useState('')

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      toast.success('Order placed successfully!')
      clearCart()
      navigate('/')
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to place order.'
      toast.error(message)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderData = {
      address,
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: getCartTotal(),
    }
    orderMutation.mutate(orderData)
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-pink-400 mb-6">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary-hyper px-8 py-3"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-black text-pink-400 mb-8 tracking-wide">CHECKOUT</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-4 border-b border-pink-400/50 pb-2">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name (Locked)
              </label>
              <input
                type="text"
                value={userInfo.name}
                disabled
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email (Locked)
              </label>
              <input
                type="email"
                value={userInfo.email}
                disabled
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Shipping Address
              </label>
              <textarea
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={orderMutation.isPending || !address}
              className="btn-primary-hyper w-full text-base"
            >
              {orderMutation.isPending ? 'Processing...' : 'PLACE ORDER'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-4 border-b border-pink-400/50 pb-2">Order Summary</h2>
          <div className="bg-gray-900 rounded-xl shadow-2xl shadow-cyan-500/10 p-6 border-2 border-cyan-400/30">
            <div className="space-y-4 mb-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border border-gray-700"
                    />
                    <div>
                      <p className="font-semibold text-gray-100">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-pink-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-2xl font-black">
                <span>TOTAL:</span>
                <span className="text-cyan-400">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout