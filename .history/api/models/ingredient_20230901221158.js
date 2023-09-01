const mongoose = require("mongoose")

const ingredientSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        vegan: String,
        vegetarian: Number
});

module.exports = mongoose.model('Ingredient', ingredientSchema)