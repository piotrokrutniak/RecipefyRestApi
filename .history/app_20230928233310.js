const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors") // import cors module

const process = require("./nodemon.json")

const recipeRoutes = require("./api/routes/recipes")
const ingredientRoutes = require("./api/routes/ingredients")
const recipeIngredientRoutes = require("./api/routes/recipeIngredients")
const recipeSectionRoutes = require("./api/routes/recipeSections")

mongoose.connect('mongodb+srv://piotrokrutniak:' + process.env.MONGO_PW + '@node-rest-recipefy.nzu9cxn.mongodb.net/?retryWrites=true&w=majority')

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.use("/recipes", cors(), recipeRoutes) // use cors middleware for recipes route
app.use("/ingredients", cors(), ingredientRoutes) // use cors middleware for ingredients route
app.use("/recipeIngredients", cors(), recipeIngredientRoutes) // use cors middleware for ingredients route
app.use("/recipeSections", cors(), recipeSectionRoutes) // use cors middleware for ingredients route

// Handling wrong endpoints
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app 
