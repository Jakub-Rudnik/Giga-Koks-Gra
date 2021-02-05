const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5500",
        credentials: true
    }
})

http.listen(4000, function() {
    console.log('Listening on port 4000')
})