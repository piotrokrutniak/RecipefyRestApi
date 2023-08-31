const express: any = require("express")

const app = express()

app.use((req, res, next) => {
    res.status(200).json({
        message: "XDDXDXDX"
    })
})

module.exports = app