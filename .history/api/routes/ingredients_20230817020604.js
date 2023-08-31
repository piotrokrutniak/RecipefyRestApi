const express = require("express");
const router = express.Router()

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Ingredients"
    })
})

router.post("/", (req, res, next) => {
    const data = req.body

    const ingredient = {
        name: data.name,
        categories: data.categories,
        vegan: data.vegan
    }

    res.status(201).json({
        message: "New ingredient"
    })
})

router.get("/:ingredientId", (req, res, next) => {
    const id = req.params.ingredientId

    res.status(200).json({
        message: `ingredient with id ${id}`
    })
})

router.patch("/:ingredientId", (req, res, next) => {
    const id = req.params.ingredientId

    res.status(200).json({
        message: `Updated ingredient with id ${id}`
    })
})

router.delete("/:ingredientId", (req, res, next) => {
    const id = req.params.ingredientId

    res.status(200).json({
        message: `Deleted ingredient with id ${id}`
    })
})






module.exports = router 