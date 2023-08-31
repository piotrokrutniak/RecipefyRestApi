const express = require("express")
const app = express()
const recipeRoutes = require('./api/routes/recipes')
const morgan = require("morgan")

app.use(morgan("dev"))

app.use("/recipes", recipeRoutes)

//handle wrong endpoints
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status(404)
    next(error)
})
module.exports = app