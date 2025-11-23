import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

// Function to fetch products filtered by a search query
const fetchSearchResults = async (query) => {
  // Sends a request like: GET /api/products?keyword=shoes
  const { data } = await api.get(`/products?keyword=${query}`);
  return data;
};

const SearchResultsPage = () => {
  const { search } = useLocation(); // Gets the query string part: "?q=term"
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('q') || ''; // Extracts the search term

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    // Query key includes the search term to refetch when the term changes
    queryKey: ['searchResults', searchTerm], 
    queryFn: () => fetchSearchResults(searchTerm),
    // Only run the query if there is an actual search term
    enabled: !!searchTerm, 
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="text-2xl text-emerald-400">Searching for "{searchTerm}"...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="text-2xl text-red-400">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-black text-emerald-400 mb-8 tracking-wide">
        Search Results for "{searchTerm}"
      </h1>
      
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-2xl text-gray-400">
            No products found matching "{searchTerm}".
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;