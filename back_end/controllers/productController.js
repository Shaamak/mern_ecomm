import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

// @desc    Get all products (with optional category and keyword filter)
// @route   GET /api/products?keyword=term&category=slug
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // 1. Initialize the filter object
  let filter = {};

  // --- NEW: Keyword Search Filtering ---
  const keyword = req.query.keyword;

  if (keyword) {
    // Add a case-insensitive regex search on the 'name' field
    // (You can add 'description' or other fields here if needed)
    filter.name = { $regex: keyword, $options: 'i' }; 
  }
  // --- END NEW: Keyword Search Filtering ---

  // --- EXISTING: Category Filtering ---
  const categorySlug = req.query.category 
    ? req.query.category.toLowerCase()
    : null;

  if (categorySlug) {
    // Convert the slug (e.g., 'home-and-kitchen') to the database format ('Home & Kitchen')
    let categoryName = categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (categoryName.includes(' And ')) {
        categoryName = categoryName.replace(' And ', ' & ');
    }
    
    // Add the category filter to the existing filter object.
    // This allows combining category AND keyword filters.
    filter.category = { 
        $regex: categoryName, 
        $options: 'i' 
    };
  }
  // --- END EXISTING: Category Filtering ---

  // 4. Find products using the combined filter.
  // If no category or keyword is present, filter remains {} and all products are returned.
  const products = await Product.find(filter)
  res.json(products)
})

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }