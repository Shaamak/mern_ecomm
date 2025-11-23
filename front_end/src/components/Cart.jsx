import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-700 shadow-2xl shadow-emerald-500/30 z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h2 className="text-2xl font-black text-emerald-400">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-emerald-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">Your cart is empty. Go get some products.</p>
            ) : (
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-4 border-b border-gray-600 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-100">{item.name}</h3>
                      <p className="text-amber-400 font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 rounded bg-gray-600 text-amber-400 font-bold hover:bg-gray-500"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-gray-100">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 rounded bg-gray-600 text-amber-400 font-bold hover:bg-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-600 p-4 space-y-4">
              <div className="flex justify-between text-2xl font-black">
                <span>TOTAL:</span>
                <span className="text-emerald-400">${getCartTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-primary-hyper w-full"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart