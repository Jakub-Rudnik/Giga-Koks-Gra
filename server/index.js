const app = require('express')()
const http = require('http').createServer(app)
const { initGame, gameLoop } = require('./game');
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5500",
        credentials: true
    }
})

io.on('connection', client => {
    const newGameState = initGame;
    client.emit('new-game-state', JSON.stringify(newGameState))
})

http.listen(4000, function() {
    console.log('Listening on port 4000')
})