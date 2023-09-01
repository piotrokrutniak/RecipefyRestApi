const mongoose = require("mongoose")

const ingredientSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        vegan: Boolean,
        vegetarian: Boolean
});

module.exports = mongoose.model('Ingredient', ingredientSchema)