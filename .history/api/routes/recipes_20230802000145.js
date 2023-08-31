const express = require("express");
const router = express.Router()

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "recipe"
    })
})

router.post("/", (req, res, next) => {
    res.status(200).json({
        message: "recipe"
    })
})

router.get("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId

    res.status(200).json({
        message: "recipe"
    })
})




module.exports = router