const express = require("express")
const app = express()
const recipeRoutes = require('./api/routes/recipes')
const morgan = require("morgan")

app.use(morgan("dev"))

app.use("/recipes", recipeRoutes)


module.exports = app