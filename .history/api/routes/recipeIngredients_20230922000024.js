const express = require("express");
const RecipeIngredient = require("../models/recipeIngredient");
const router = express.Router()

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "recipeIngredients"
    })
})

router.post("/", (req, res, next) => {
    const data = req.body

    

    for (const recipe of data){
        const recipeIngredient = new RecipeIngredient({
            recipeId: recipe.recipeId,
            ingredientId: recipe.ingredientId,
            desc: recipe.desc
        })

        recipeIngredient.save()
        .then(
            result => {
            console.log(result)
            res.status(201).json({
                message: "New recipe ingredient added",
                ingredientCreated: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
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