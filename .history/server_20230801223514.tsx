const http: any = require("http")

const port = process.env.PORT || 3004

const server: any = http.createServer()

server.listen(port)