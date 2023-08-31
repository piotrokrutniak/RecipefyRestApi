const express = require("express")
const app = express()
const recipeRoutes = require('./api/routes/recipes')
const morgan = require("morgan")
const bodyParser = require("body-parser")

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.use("/recipes", recipeRoutes)

//CORS bypass

app.use((req, res, next)) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

    req.method === 'OPTIONS' ?? res.header("Access-control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
}

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