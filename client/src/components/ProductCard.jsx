import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="bg-gray-700 rounded-xl overflow-hidden shadow-2xl shadow-gray-700/50 border border-gray-600 hover:shadow-emerald-400/20 transition-all duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-bold text-emerald-400 hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-black text-amber-400">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-secondary-hyper"
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard