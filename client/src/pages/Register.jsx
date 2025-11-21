import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { register, userInfo } = useAuth()
  
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      toast.success('Account created successfully!')
      navigate(redirect)
    } catch (error) {
      let errorMessage = 'Registration failed' // Default message
      if (error.response?.data?.errors) {
        // Handle validation errors (array)
        errorMessage = error.response.data.errors[0].msg
      } else if (error.response?.data?.message) {
        // Handle other errors (like "User already exists")
        errorMessage = error.response.data.message
      }
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border-2 border-pink-400/50 rounded-xl shadow-2xl shadow-cyan-500/20 bg-gray-800">
      <h1 className="text-4xl font-black mb-6 text-center text-pink-400 tracking-wide">JOIN THE CLUB</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-hyper w-full text-base mt-6"
        >
          {loading ? 'REGISTERING...' : 'REGISTER'}
        </button>
      </form>
      <p className="mt-6 text-center text-gray-400">
        Already have an account?{' '}
        <Link to={`/login?redirect=${redirect}`} className="text-cyan-400 font-semibold hover:text-pink-400 hover:underline transition-colors">
          Login Here
        </Link>
      </p>
    </div>
  )
}

export default Register