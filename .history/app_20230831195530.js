const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const recipeRoutes = require("./api/routes/recipes")
const ingridientRoutes = require("./api/routes/ingredients")


mongoose.connect("mongodb+srv://piotrokrutniak:<pFJG#5iW"7J'_b)>@node-rest-recipefy.nzu9cxn.mongodb.net/?retryWrites=true&w=majority")

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.use("/recipes", recipeRoutes)

//CORS bypass

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

    if (req.method === 'OPTIONS'){
        res.header("Access-control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET") 
        return res.status(200)
    }
})

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