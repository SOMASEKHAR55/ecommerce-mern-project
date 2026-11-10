const mongoose = require('mongoose');

const fakestoreSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number
  }
});

module.exports = mongoose.model('Fakestore', fakestoreSchema);
    