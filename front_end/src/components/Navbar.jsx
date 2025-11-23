import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Cart from './Cart'
import { useState } from 'react' // 💡 Import useState for search input

const Navbar = () => {
  const { getCartCount, isCartOpen, setIsCartOpen } = useCart()
  const { userInfo, logout } = useAuth()
  const navigate = useNavigate()
  
  // 💡 State for the search term
  const [searchTerm, setSearchTerm] = useState('')

  // Define the categories for the dropdown
  const categories = [
    'Electronics',
    'Fashion',
    'Accessories',
    'Sports',
    'Smart Home',
    'Books',
    'Outdoor',
  ]

  const logoutHandler = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  // 💡 Handler for when the user submits the search form
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // 🚀 ACTION: Navigate to a search results page
      // We are using /search?q=TERM for the search route
      navigate(`/search?q=${searchTerm.trim()}`)
      setSearchTerm('') // Clear the input after search
    }
  }

  return (
    <>
      <nav className="bg-gray-700 shadow-xl border-b-2 border-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* LEFT SECTION: Logo and Categories */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-2xl font-black text-emerald-400 tracking-wider">
                E-SHOP
              </Link>
              
              {/* Category Dropdown (Existing) */}
              <div className="relative group hidden sm:block"> {/* Hide on extra small screens */}
                <button className="text-gray-300 hover:text-amber-400 px-3 py-2 flex items-center">
                  Categories
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-gray-700 shadow-lg border border-emerald-500 z-10 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase().replace(/\s/g, '-')}`}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-amber-400"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER SECTION: Search Bar */}
            <div className="flex-1 flex justify-center items-center px-4">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-sm text-gray-100 bg-gray-600 rounded-lg border border-emerald-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 placeholder-gray-400"
                  />
                  <button type="submit" className="absolute left-0 top-0 mt-2 ml-3 text-gray-400 hover:text-amber-400">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            {/* END Search Bar */}

            {/* RIGHT SECTION: Cart, Home, Auth Links */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-amber-400 px-3 py-2 hidden md:block">
                Home
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-300 hover:text-amber-400 px-3 py-2"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
              
              {userInfo ? (
                <>
                  <span className="text-gray-300 px-3 py-2 hidden sm:block">
                    Yo, {userInfo.name.split(' ')[0]}
                  </span>
                  <button
                    onClick={logoutHandler}
                    className="text-gray-300 hover:text-amber-400 px-3 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-300 hover:text-amber-400 px-3 py-2">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar