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
                return value >= 20 && value <= 1000;
            },
        },
    },
});

module.exports = mongoose.model('Furniture', furnitureSchema);