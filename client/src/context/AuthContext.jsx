import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUser = localStorage.getItem('userInfo')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Failed to parse user info', error)
      return null
    }
  })

  const login = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password })
    setUserInfo(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/users/register', {
      name,
      email,
      password,
    })
    setUserInfo(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const logout = async () => {
    try {
      await api.post('/users/logout')
    } catch (error) {
      console.error('Logout failed', error)
    }
    setUserInfo(null)
    localStorage.removeItem('userInfo')
  }

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}