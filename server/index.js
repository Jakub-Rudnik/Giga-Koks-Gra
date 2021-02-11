const app = require('express')()
const http = require('http').createServer(app)

const { newGameState, getPlayerState } = require('./game');

const destination = '/client/gameOut.html'
const gameStates = [];

const io = require('socket.io')(http, {
    cors: {
        origin: "http://127.0.0.1:5500",
        credentials: true
    }
})


function gameLoop(gameState) {

}


io.on('connection', socket => {
    const ROOM_NAME = 'siemanko'

    if (gameStates[ROOM_NAME] === undefined)
        gameStates[ROOM_NAME] = newGameState();


    const player1Id = gameStates[ROOM_NAME].players[0].playerId
    const player2Id = gameStates[ROOM_NAME].players[1].playerId

    if (player1Id === -1 && player2Id === -1) {
        gameStates[ROOM_NAME].players[0].playerRef = socket 
        gameStates[ROOM_NAME].players[0].playerId = socket.id

    } else if (player2Id === -1) {
        gameStates[ROOM_NAME].players[1].playerRef = socket 
        gameStates[ROOM_NAME].players[1].playerId = socket.id

    } else {
        socket.emit('redirect', destination)
    }


    socket.on('disconnect', () => {
        // @ trzeba dodac ze drugi gracz wygrywa ktory sie nie rozlaczy
        if (player1Id === socket.id ) {
            gameStates[ROOM_NAME].players[0].playerId = -1
        } else {
            gameStates[ROOM_NAME].players[1].playerId = -1
        }
    });


    socket.on('user-choice', userNumber => {
        if (player1Id === socket.id ) {
            gameStates[ROOM_NAME].players[0].playerGuess = userNumber
        } else {
            gameStates[ROOM_NAME].players[1].playerGuess = userNumber
        }

        //console log player1guess and player2guess
        if (gameStates[ROOM_NAME].players[0].playerGuess !== -1
                && gameStates[ROOM_NAME].players[1].playerGuess !== -1) {
            console.log(player1Id + " " + gameStates[ROOM_NAME].players[0].playerGuess)
            console.log(player2Id + " " + gameStates[ROOM_NAME].players[1].playerGuess)
        }
            

        // ogolny state w ktorym jest id player1 czy playerid2
        // sprawdzamy czy nie wyslal drugi raz
        // zapisujemy
    })

    const playerState = getPlayerState(gameStates[ROOM_NAME]);
    socket.emit('new-game-state', JSON.stringify(playerState))
    // wlaczyc timer 15 sekund na wybor lcizby a potem porownac wyniki i odeslac nowa runde
})


http.listen(4000, function() {
    console.log('Listening on port 4000')
})