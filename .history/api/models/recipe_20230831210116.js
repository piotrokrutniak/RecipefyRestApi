const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        title: String,
        summary: String,
        rating: Number,
        coverImage: Url
});

module.exports = mongoose.model('Recipe', recipeSchema)