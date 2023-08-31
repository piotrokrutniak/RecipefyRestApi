const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")

const Recipe = require("../models/recipe")

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Recipes"
    })
})

router.post("/", (req, res, next) => {
    const data = req.body

    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        summary: data.summary,
        rating: data.rating,
        coverImage: data.coverUrl
    })

    recipe.save()
        .then(result => console.log(result))
        .catch(err => console.log(err))

    res.status(201).json({
        message: "New recipe created",
        recipeCreated: recipe
    })
    
})

router.get("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId

    Recipe.findById(id)
        .exec()
        .then(doc => console.log(doc))
        .catch(err => console.log(err))

    res.status(200).json({
        message: `Recipe with id ${id}`
    })
})

router.patch("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId

    res.status(200).json({
        message: `Updated recipe with id ${id}`
    })
})

router.delete("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId

    res.status(200).json({
        message: `Deleted recipe with id ${id}`
    })
})






module.exports = router 