const mongoose = require("mongoose")

const recipeIngredientSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        recipeId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
});

module.exports = mongoose.model('RecipeIngredient', recipeIngredientSchema)