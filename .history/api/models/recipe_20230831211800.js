const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        summary: String,
        rating: Number,
        coverImage: String
});

module.exports = mongoose.model('Recipe', recipeSchema)