const app = require('express')()
const http = require('http').createServer(app)

const { newGameState, getPlayerState } = require('./game');

const gameStates = [];

const io = require('socket.io')(http, {
    cors: {
        origin: "http://127.0.0.1:5500",
        credentials: true
    }
})


io.on('connection', socket => {
    // jesli playerid1 jest puste to zajmij je
    // jesli nie to wez na drugie
    // jesli trzecie to wypiierdalaj nie ma miejsca
    // console.log(socket.id); to jest pomocne

    socket.on('user-choice', userNumber => {
        console.log(userNumber);
        // ogolny state w ktorym jest id player1 czy playerid2
        // sprawdzamy czy nie wyslal drugi raz 
        // zapisujemy
    })
    
    if (gameStates['siemanko'] === undefined)
    gameStates['siemanko'] = newGameState();
    
    const playerState = getPlayerState(gameStates['siemanko']);
    socket.emit('new-game-state', JSON.stringify(playerState))
    // wlaczyc timer 15 sekund na wybor lcizby a potem porownac wyniki i odeslac nowa runde
})


http.listen(4000, function() {
    console.log('Listening on port 4000')
}) 