const express = require("express");
const router = express.Router()

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "recipeIngredients"
    })
})

router.post("/", (req, res, next) => {
    const data = req.body

    const recipeIngredient = {
        recipeId: data.recipeId,
        ingredientId: data.ingredientId,
        quantity: data.quantity,
        measurementUnit: data.measurementUnit
    }

    res.status(201).json({
        message: "Added new recipe ingredient.",
        createdRecipeIngredient: recipeIngredient
    })
})

router.get("/:recipeIngredientId", (req, res, next) => {
    const id = req.params.recipeIngredientId

    res.status(200).json({
        message: `recipeIngredient with id ${id}`
    })
})

router.patch("/:recipeIngredientId", (req, res, next) => {
    const id = req.params.recipeIngredientId

    res.status(200).json({
        message: `Updated recipeIngredient with id ${id}`
    })
})

router.delete("/:recipeIngredientId", (req, res, next) => {
    const id = req.params.recipeIngredientId

    res.status(200).json({
        message: `Deleted recipeIngredient with id ${id}`
    })
})

module.exports = router