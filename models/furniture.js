const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: String,
    finish: String,
    price: Number 
});

module.exports = mongoose.model('Furniture', furnitureSchema);