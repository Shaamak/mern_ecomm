import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Login from './pages/Login' // Import
import Register from './pages/Register' // Import
import ProtectedRoute from './components/ProtectedRoute' // Import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App