const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env.prod' }); // if use locally ONLY
//require('dotenv').config(); // will use `.env` locally, and Render’s env vars on deployment

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

// Routes
const customerRoutes = require('./routes/customers');
const salesRoutes = require('./routes/sales');
const inventoryRoutes = require('./routes/inventory');
const expensesRoutes = require('./routes/expenses');

//DB Connect
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`✅ Connected to MongoDB Atlas [${process.env.ENVIRONMENT} environment]`);
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Route Handlers
app.use('/api/customers', customerRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/expenses', expensesRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
