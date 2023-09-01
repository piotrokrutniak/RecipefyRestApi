const mongoose = require("mongoose")

const recipeSectionSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        recipeId: mongoose.Schema.Types.ObjectId,
        title: String,
        richText: String,
        order: Number
});

module.exports = mongoose.model('RecipeSection', recipeSectionSchema)