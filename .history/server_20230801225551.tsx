const http = require("http")
const app = require("./app")

const port = process.env.PORT || 3004

const server = http.createServer()

server.listen(port)