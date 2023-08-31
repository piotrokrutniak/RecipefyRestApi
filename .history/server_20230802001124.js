const http = require("http")
const appExpress = require("./app")

const port = process.env.PORT || 3004

const server = http.createServer(appExpress)

server.listen(port)x