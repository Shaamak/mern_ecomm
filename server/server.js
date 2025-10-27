import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser' // Make sure this is imported
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Import routes
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import userRoutes from './routes/userRoutes.js' // Make sure this is imported

dotenv.config()
connectDB()

const app = express()

// CORS Configuration (CRITICAL)
app.use(cors({
  origin: 'http://localhost:3000', // Your client's URL
  credentials: true,
}))

// Body parser middleware (CRITICAL)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser middleware (CRITICAL)
app.use(cookieParser())

// --- API Routes ---
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes) // Make sure this line exists

// --- Error Handling Middleware ---
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))