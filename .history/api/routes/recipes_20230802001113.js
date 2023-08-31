const express = require("express");
const router = express.Router()

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Recipes"
    })
})

router.post("/", (req, res, next) => {
    res.status(201).json({
        message: "New recipe"
    })
})

router.get("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId

    res.status(200).json({
        message: `Recipe with xd id ${id}`
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