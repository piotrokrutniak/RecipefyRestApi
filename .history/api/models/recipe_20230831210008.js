const mongoose = require("mongoose")

const recipeSchema = moongose.Schema({
        _id: mongoose.Types.ObjectId,
        title: String,
        summary: String,
        rating: Number,
        coverImage: Url
});

module.exports = mongoose.model('Recipe', recipeSchema)