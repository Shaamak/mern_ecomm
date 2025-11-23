import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

// Function to fetch products filtered by category
// The category name will be passed as a query parameter to the API
const fetchCategoryProducts = async (categorySlug) => {
  // Assuming your backend API supports filtering by category via a query parameter
  // e.g., GET /api/products?category=electronics
  const { data } = await api.get(`/products?category=${categorySlug}`)
  return data
}

const CategoryPage = () => {
  const { categorySlug } = useParams()

  // Helper function to format the slug for the display title
  const formatTitle = (slug) => {
    // Converts 'home-and-kitchen' to 'Home & Kitchen' for a nicer title
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace('And', '&'); // Enhance 'Home and Kitchen'
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    // Query key includes categorySlug so React Query refetches when the category changes
    queryKey: ['products', categorySlug], 
    queryFn: () => fetchCategoryProducts(categorySlug),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="text-2xl text-emerald-400">Loading products in {formatTitle(categorySlug)}...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="text-2xl text-red-400">
          Error loading products: {error.message}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-black text-emerald-400 mb-8 tracking-wide">
        {formatTitle(categorySlug).toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-2xl text-gray-400">
              No products found in the "{formatTitle(categorySlug)}" category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage