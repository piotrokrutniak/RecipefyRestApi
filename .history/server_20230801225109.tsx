const http: any = require("http")

const port: any = process.env.PORT || 3004

const server: any = http.createServer()

server.listen(port)