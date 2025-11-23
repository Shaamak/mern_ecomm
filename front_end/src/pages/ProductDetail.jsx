import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '../services/api'
import { useCart } from '../context/CartContext'

const fetchProduct = async (productId) => {
  const { data } = await api.get(`/products/${productId}`)
  return data
}

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  })

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="text-2xl text-emerald-400">Loading...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="text-2xl text-red-400">
          {error.response?.status === 404
            ? 'Product not found'
            : `Error: ${error.message}`}
        </div>
      </div>
    )
  }
  
  if (!product) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-amber-400 hover:text-emerald-400 flex items-center transition-colors font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <div className="bg-gray-700 rounded-xl shadow-2xl shadow-amber-500/10 overflow-hidden border border-gray-600">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-4xl font-black text-emerald-400 mb-4 tracking-wide">
              {product.name}
            </h1>
            <p className="text-gray-300 mb-6">{product.description}</p>
            <div className="mb-4">
              <span className="text-sm text-gray-400">Category:</span>
              <span className="ml-2 text-emerald-400 font-semibold">{product.category}</span>
            </div>
            <div className="mb-6">
              <span className="text-sm text-gray-400">Stock:</span>
              <span className="ml-2 text-amber-400 font-semibold">{product.stock} available</span>
            </div>
            <div className="text-5xl font-black text-amber-400 mb-8">
              ${product.price.toFixed(2)}
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary-hyper w-full text-base"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail