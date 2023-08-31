const express = require("express")
const app = express()
const recipeRoutes = require('./api/routes/recipes')

app.use("/recipes", recipeRoutes)

module.exports = app