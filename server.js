
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Fakestore = require('./models/Fakestores');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('E-Commerce Backend is running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully!');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// CREATE
app.post('/api/fakestores', async (req, res) => {
  try {
    const products = await Fakestore.insertMany(
      Array.isArray(req.body) ? req.body : [req.body]
    );
    res.status(201).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ
app.get('/api/fakestores', async (req, res) => {
  try {
    const products = await Fakestore.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE
app.put('/api/fakestores/:id', async (req, res) => {
  try {
    const product = await Fakestore.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false, message: 'Product not found'
      });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE
app.delete('/api/fakestores/:id', async (req, res) => {
  try {
    const product = await Fakestore.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false, message: 'Product not found'
      });
    }
    res.send('Product deleted successfully');
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
