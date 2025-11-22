import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { login, userInfo } = useAuth()
  
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
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Logged in successfully!')
      navigate(redirect)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border-2 border-emerald-400/50 rounded-xl shadow-2xl shadow-amber-500/20 bg-gray-700">
      <h1 className="text-4xl font-black mb-6 text-center text-emerald-400 tracking-wide">SIGN IN</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input-hyper"
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
            className="form-input-hyper"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-hyper w-full text-base"
        >
          {loading ? 'LOGGING IN...' : 'SIGN IN'}
        </button>
      </form>
      <p className="mt-6 text-center text-gray-400">
        New Customer?{' '}
        <Link to={`/register?redirect=${redirect}`} className="text-amber-400 font-semibold hover:text-emerald-400 hover:underline transition-colors">
          Register Here
        </Link>
      </p>
    </div>
  )
}

export default Login