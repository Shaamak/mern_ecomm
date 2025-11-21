import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

// Define the fetch function *outside* the component
const fetchProducts = async () => {
  const { data } = await api.get('/products')
  return data
}

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-2xl text-pink-400">Loading...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-2xl text-red-400">
          Error: {error.message}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-black text-pink-400 mb-8 tracking-wide">NEW ARRIVALS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home