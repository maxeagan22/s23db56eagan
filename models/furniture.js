const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: String,
    finish: String,
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                // Custom validator function to check if the price is between 15 and 2000
                return value >= 15 && value <= 2000;
            },
            message: 'Price must be between 15 and 2000.',
        },
    },
});

module.exports = mongoose.model('Furniture', furnitureSchema);