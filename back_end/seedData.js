import mongoose from 'mongoose';
import Product from './models/Product.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking, GPS, and water resistance. Stay connected and healthy.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable and durable running shoes with excellent cushioning. Perfect for daily exercise and long-distance running.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    stock: 100,
  },
  {
    name: 'Laptop Backpack',
    description: 'Spacious and stylish laptop backpack with multiple compartments. Water-resistant and comfortable for daily commute.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 75,
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning with ease.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
   category: 'Accessories',
     stock: 40,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with extra cushioning. Perfect for yoga, pilates, and home workouts.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 120,
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature. Eye-friendly lighting for work and study.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home & Office',
    stock: 60,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design. Take your music anywhere.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 85,
  },
  
 {
    name: '4K Ultra HD Monitor',
    description: '27-inch 4K monitor with HDR support and thin bezels. Perfect for design work and immersive entertainment.',
    price: 349.99,
    image: 'https://m.media-amazon.com/images/I/81FFCjMtVZL._US500_.jpg',
    category: 'Electronics',
    stock: 25,
  },
  {
    name: 'Portable SSD 1TB',
    description: 'High-speed 1TB External Solid State Drive. Lightning-fast data transfer for backups and creative work.',
    price: 129.99,
    image: 'https://images.teamgroupinc.com/products/ssd/external/pd20/black/4tb_02.jpg',
    category: 'Electronics',
    stock: 70,
  },
  
  {
    name: 'Classic Aviator Sunglasses',
    description: 'Timeless aviator style sunglasses with polarized lenses offering 100% UV protection. Durable metal frame.',
    price: 45.00,
    image: 'https://contents.mediadecathlon.com/p2863840/a13ee9df6499b92aa465894348501f05/p2863840.jpg',
    category: 'Fashion',
    stock: 150,
  },
  {
    name: "Men's Casual Cotton T-Shirt",
    description: 'Soft, breathable 100% cotton t-shirt in a standard fit. Essential wear for every wardrobe.',
    price: 19.99,
    image: 'https://m.media-amazon.com/images/I/A18Zbr2L5LL._CLa%7C2140%2C2000%7CB18uYndXApL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX466_.png',
    category: 'Fashion',
    stock: 200,
  },
  {
    name: 'Leather Bi-Fold Wallet',
    description: 'Handcrafted genuine leather wallet with RFID blocking technology. Slim profile with multiple card slots.',
    price: 35.50,
    image: 'https://m.media-amazon.com/images/I/51oWgM4S2-L._SX679_.jpg',
    category: 'Accessories',
    stock: 90,
  },
  {
    name: 'Air Fryer XL',
    description: 'Large capacity digital air fryer for healthy, oil-free cooking. Features 8 preset cooking modes.',
    price: 119.99,
    image: 'https://m.media-amazon.com/images/I/816RQh3J2qL.jpg',
    category: 'Electronics',
    stock: 35,
  },
  {
    name: 'Bamboo Cutting Board Set',
    description: 'Set of 3 natural bamboo cutting boards. Durable, naturally anti-microbial, and gentle on knives.',
    price: 24.99,
    image: 'https://m.media-amazon.com/images/I/61bBPLUyTyL.jpg',
    category: 'Accessories',
    stock: 110,
  },
  
  {
    name: 'Resistance Band Set',
    description: '5-piece set of durable resistance loop bands with varying tension levels. Includes carrying bag and guide.',
    price: 15.99,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSW8n0Qz73PrOc_cbCnJHe3Sol-vDEJ5gCD3_KZxYNdKxh00l1ISejzq0LshSDpN17KfrYIcKUaZcMKcDcEk0H7grbcUKNGIFlGaFHau3K8KFiAFBzRNmZn',
    category: 'Sports',
    stock: 180,
  },
  {
    name: 'Noise-Cancelling Earbuds',
    description: 'True wireless earbuds with superior active noise cancellation, perfect for travel and work.',
    price: 149.99,
    image: 'https://m.media-amazon.com/images/I/51qMK4q-NVL._AC_UF1000,1000_QL80_.jpg', // Placeholder
    category: 'Electronics',
    stock: 65,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Full-size mechanical keyboard with tactile brown switches and customizable RGB lighting.',
    price: 89.99,
    image: 'https://m.media-amazon.com/images/I/61P7MvyRbUL.jpg', // Placeholder
    category: 'Electronics',
    stock: 50,
  },
  // --- Home & Kitchen ---
  {
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with rich audio, integrated smart home hub, and privacy controls.',
    price: 99.00,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSFrkLDXCNkjO1BqQ7-n7oiC5iIML0no16Ohr5h708UgtSat2cuOQzyMB8muC4ts6SthkEoO3JTh-ufQSAHRne4MlLbPLPMq9VCZS_VE9MMimBhLFJOurZMgQ', // Placeholder
    category: 'Smart Home',
    stock: 45,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated 32 oz stainless steel bottle keeps drinks cold for 24 hours and hot for 12.',
    price: 25.99,
    image: 'https://m.media-amazon.com/images/I/71wFyZlg58L.jpg', // Placeholder
    category: 'Accessories',
    stock: 220,
  },
  // --- Fashion / Apparel ---
  {
    name: "Women's High-Rise Jeans",
    description: 'Comfortable stretch denim in a flattering high-rise straight-leg cut. Classic blue wash.',
    price: 55.99,
    image: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/AUGUST/18/mDV4tKae_ced0c775adb94385b33aedbfa9e0ed20.jpg', // Placeholder
    category: 'Fashion',
    stock: 130,
  },
  {
    name: 'Knit Beanie Hat',
    description: 'Warm, soft, acrylic knit beanie. One size fits all. Available in multiple colors.',
    price: 14.50,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQxXo96YN9N1i0043oyiuFMBlU6oEG3CMP5FAFGNjYTOejRVIRX_V5PcYGqO2zmobcQBJT40oikMgGWeHyCZ0hrty1DNokDt57n1sBCUT8U9dXJwzqQrOiL7g', // Placeholder
    category: 'Accessories',
    stock: 300,
  },
  // --- Books / Media ---
  {
    name: 'The MERN Stack Handbook',
    description: 'A comprehensive guide to building full-stack applications using MongoDB, Express, React, and Node.js.',
    price: 39.99,
    image: 'https://m.media-amazon.com/images/I/71saawJytPL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg', // Placeholder
    category: 'Books',
    stock: 90,
  },
  // --- Sports / Outdoors ---
  {
    name: 'Compact Camping Tent',
    description: 'Lightweight and waterproof 2-person tent. Easy setup, perfect for backpacking and short trips.',
    price: 110.00,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRyWrFXKjyrFkCC5LHvxtx2TAjj-1vQ40rjKstAU0MIY0jfgf9iSApIDQmyzrFfwwrtaQzT_CFpcvBWXKC6sxHvA0B9zMV_kbF2QQSfbdp7_JitzU2JBKBC', // Placeholder
    category: 'Outdoors',
    stock: 40,
  },
  {
    name: 'Dumbbell Set (Adjustable)',
    description: 'Adjustable dumbbell set from 5 to 52.5 lbs. Saves space and time for home workouts.',
    price: 249.99,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSJOUH_jPAAq5iHbRJA4dhyGR8rulM6cF4RHEaTrABwlwGPnvW7PYoKWjjy6JkxZBA6pqm3-f7aBUTCk-X1P93fQ_Q-HXZfUNTjHCGB-YVWEph4u-1KE9SJ', // Placeholder
    category: 'Sports',
    stock: 20,
  },
  // --- Toys & Games ---
  {
    name: 'Modular Building Blocks Kit',
    description: 'Advanced 1000-piece building block kit for detailed mechanical models. Ages 12+.',
    price: 79.95,
    image: 'https://m.media-amazon.com/images/I/71Y579UnCzL._AC_SL1154_.jpg', // Placeholder
    category: 'Sports',
    stock: 150,
  },

  {
    name: 'Adjustable Dumbbell Set (50 lbs)',
    description: 'Quick-adjust dumbbell set, replacing 15 sets of weights. Perfect for home gym strength training.',
    price: 299.99,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSJOUH_jPAAq5iHbRJA4dhyGR8rulM6cF4RHEaTrABwlwGPnvW7PYoKWjjy6JkxZBA6pqm3-f7aBUTCk-X1P93fQ_Q-HXZfUNTjHCGB-YVWEph4u-1KE9SJ', 
    category: 'Sports',
    stock: 25,
  },
  {
    name: 'High-Density Foam Roller',
    description: '18-inch extra firm foam roller for deep tissue massage, muscle recovery, and physical therapy.',
    price: 19.50,
    image: 'https://m.media-amazon.com/images/I/61QUuUuLlKL.jpg', 
    category: 'Sports',
    stock: 200,
  },
  {
    name: 'Heart Rate Monitoring Chest Strap',
    description: 'Accurate, comfortable chest strap monitor compatible with major fitness apps and equipment. Essential for cardio training.',
    price: 65.00,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn0raJj8vquaxGZXbCs6XSU6Gq316WDYT08KdzkvFJHMl5tNy0kwu6IvWO9o05nlp-De7CTJj8XuttW2vbdiwJ4p0hKIPYBIKE-RAIAOZox3IqYDBT0G3g', 
    category: 'Sports',
    stock: 90,
  },
  {
    name: 'Waterproof Fitness Tracker Watch',
    description: 'All-day activity tracking, sleep monitoring, and GPS built-in. Fully waterproof for swimming and outdoor use.',
    price: 79.99,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqJB4TpT7ZbM-dseu1ulB1z3s0d6hgtDo8vLeDtIlWXhfOfgIYQZYghn7xouVAHL1uacpYhMW-tsgJQTezhofiFVSMOpTQBWTEZDZ6nDrsHNge-vvGh3LlK5s', 
    category: 'Sports',
    stock: 110,
  },
  {
    name: 'Heavy-Duty Jump Rope',
    description: 'Adjustable speed jump rope with weighted handles. Ideal for high-intensity interval training (HIIT) and endurance.',
    price: 14.99,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRpR-dQlW4W5vxx1JPKMyT0q3P3yIEVZ4ykIuB0CuJYOhQFN8BqzKeevJY4Rra1KXkz3mU2V1SrlKYIy4-Tnnc90IP_NlnWqgYfJZWDiHn_WVYE9poABX0T', 
    category: 'Sports',
    stock: 350,
  },

  {
    name: 'Rechargeable LED Headlamp',
    description: '500-lumen waterproof headlamp with multiple modes. Essential for trail running, camping, and late-night activities.',
    price: 34.99,
    image: 'https://m.media-amazon.com/images/I/71erPxy1gvL.jpg', 
    category: 'Sports',
    stock: 80,
  },
  {
    name: 'Collapsible Trekking Poles',
    description: 'Lightweight aluminum hiking poles with adjustable height and cork grips. Reduces joint impact on long hikes.',
    price: 59.95,
    image: 'https://m.media-amazon.com/images/I/61AD372+jbL._SX466_.jpg', 
    category: 'Sports',
    stock: 60,
  },

  {
    name: 'Pilates Resistance Ring',
    description: 'Durable fiberglass ring with foam padded handles. Adds resistance for inner thigh, core, and arm workouts.',
    price: 22.00,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTz8BCP9SLZLsmxfg2Hngl_Z5otS7tIIcgVqXFWE69wSrQ5g2Kjt5TR9JaI9p_PrLkqvp7Z3qoGdXZJO34GPf5TP40tv2FYA1eNshNVj636kvnEmN2Bnx9x5Rg', 
    category: 'Sports',
    stock: 175,
  },
  {
    name: 'Compact Digital Camera',
    description: '24MP mirrorless camera with 4K video recording and interchangeable lenses. Perfect for vlogging and photography enthusiasts.',
    price: 699.99,
    image: 'https://www.sony.co.in/microsite/where-to-buy/electronics/cyber-shot-compact-cameras/dsc-w800/images/mod-img.jpg', 
    category: 'Electronics',
    stock: 40,
  },
  {
    name: 'VR Headset (Next-Gen)',
    description: 'Advanced virtual reality headset with 4K resolution per eye, offering wireless freedom and incredible spatial tracking.',
    price: 499.00,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR2MVfKLY0tY48IA29HKQ6-vni7rbPUyW0kp4xlxoaeFQtePoq_wI_xKkDqgS0VvYSO3RUBsTyFTb5qI0ZPUntqbEd-Wjzd8nvzBaOrQmr65bQ8TU7Q3lGo', 
    category: 'Electronics',
    stock: 30,
  },

  {
    name: 'Portable Water Filter Straw',
    description: 'Lightweight, personal water filter that removes 99.9999% of waterborne bacteria. Essential for hiking and emergencies.',
    price: 18.99,
    image: 'https://m.media-amazon.com/images/I/61wAn86c7vS._SL1500_.jpg', 
    category: 'Outdoors',
    stock: 150,
  },
  {
    name: 'Compact Camping Hammock',
    description: 'Double-sized nylon hammock that packs down into a small compression sack. Includes tree straps and carabiners.',
    price: 39.50,
    image: 'https://contents.mediadecathlon.com/p2676588/2afe51658025008b28bbd1085149f4ec/p2676588.jpg', 
    category: 'Outdoors',
    stock: 85,
  },
  {
    name: 'Solar-Powered Backpack',
    description: 'Durable 40L hiking backpack with a detachable solar panel for charging phones and small devices on the trail.',
    price: 129.00,
    image: 'https://m.media-amazon.com/images/I/61dBx2Fy71L._SX679_.jpg', 
    category: 'Outdoors',
    stock: 45,
  },

{
    name: 'Smart Video Doorbell (Wired)',
    description: '1080p HD video doorbell with two-way talk, motion detection, and cloud storage options. Links directly to your existing wiring.',
    price: 149.99,
    image: 'https://www.techhive.com/wp-content/uploads/2024/03/Reolink-Smart-2K-Wired-WiFi-Video-Doorbell-with-Chime.jpg?quality=50&strip=all&w=1024', 
    category: 'Smart Home',
    stock: 50,
  },
  {
    name: 'Learning Smart Thermostat',
    description: 'Thermostat that learns your heating and cooling preferences, automatically adjusting for energy savings. Remote control via app.',
    price: 249.00,
    image: 'https://m.media-amazon.com/images/I/51sJQlPIU0L.jpg', 
    category: 'Smart Home',
    stock: 35,
  },
  {
    name: 'Color Changing Smart Bulb (4-Pack)',
    description: 'Starter kit with four A19 bulbs offering millions of colors and tunable white light. Requires no hub.',
    price: 65.50,
    image: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:75/tp-link/492850210/0/ZlmUnZdsE1-fJ61HViRHn-TP-Link-L530B-Light-492850210-i-1-1200Wx1200H.jpeg', 
    category: 'Smart Home',
    stock: 150,
  },
  {
    name: 'Advanced JavaScript Mastery',
    description: 'A deep dive into modern ES6+ features, asynchronous programming, and advanced design patterns essential for professional JavaScript development.',
    price: 49.99,
    image: 'https://m.media-amazon.com/images/I/61RLX9RI8WL._SY466_.jpg', 
    category: 'Books',
    stock: 120,
  },
  {
    name: 'The Art of Clean Code',
    description: 'Practical guide focused on writing readable, maintainable, and efficient code. Covers testing, naming conventions, and refactoring.',
    price: 34.50,
    image: 'https://www.oreilly.com/covers/urn:orm:book:9781098141349/400w/', 
    category: 'Books',
    stock: 150,
  },
  {
    name: 'Designing Data-Intensive Applications',
    description: 'A comprehensive exploration of the technologies behind modern data systems, including databases, message queues, and distributed systems.',
    price: 69.00,
    image: 'https://m.media-amazon.com/images/I/71YL95jVDpL.jpg', 
    category: 'Books',
    stock: 90,
  }  

];

const seedDatabase = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('✅ Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();