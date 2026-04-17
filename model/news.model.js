const mongoose = require('mongoose');

// Define the schema
const NewsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribe: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

// Create and export the model
const NewsModel = mongoose.model('News', NewsSchema);
module.exports = NewsModel;