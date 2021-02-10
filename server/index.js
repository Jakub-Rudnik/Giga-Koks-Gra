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
    if (gameStates['siemanko'] === undefined)
    gameStates['siemanko'] = newGameState();

    var destination = '/client/gameOut.html'

    if (gameStates['siemanko'].player1Id === -1 && gameStates['siemanko'].player2Id === -1) {
        gameStates['siemanko'].player1Id = socket.id
    } else if (gameStates['siemanko'].player2Id === -1) {
        gameStates['siemanko'].player2Id = socket.id
    } else {
        socket.emit('redirect', destination)
    }

    socket.on('disconnect', () => {
        if (gameStates['siemanko'].player1Id === socket.id ) {
            gameStates['siemanko'].player1Id = -1
        } else {
            gameStates['siemanko'].player2Id = -1
        }
    });


    socket.on('user-choice', userNumber => {
        if (gameStates['siemanko'].player1Id === socket.id ) {
            gameStates['siemanko'].player1Guess = userNumber
        } else {
            gameStates['siemanko'].player2Guess = userNumber
        }

        //console log player1guess and player2guess
        if (gameStates['siemanko'].player1Guess != -1 && gameStates['siemanko'].player2Guess != -1)
        console.log(gameStates['siemanko'].player1Id,gameStates['siemanko'].player1Guess);
        console.log(gameStates['siemanko'].player2Id,gameStates['siemanko'].player2Guess);

        // ogolny state w ktorym jest id player1 czy playerid2
        // sprawdzamy czy nie wyslal drugi raz
        // zapisujemy
    })

    const playerState = getPlayerState(gameStates['siemanko']);
    socket.emit('new-game-state', JSON.stringify(playerState))
    // wlaczyc timer 15 sekund na wybor lcizby a potem porownac wyniki i odeslac nowa runde
})


http.listen(4000, function() {
    console.log('Listening on port 4000')
})