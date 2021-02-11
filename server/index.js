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


function gameLoop(gameState, ROOM_NAME) {
    const { gameInfo, players } = gameState;
    
    function stageEnd() {
        console.log("koniec rundy:" + players[0].playerGuess + " " + players[1].playerGuess)

        if(gameInfo.stage == 1) {
            gameInfo.stage = 2;
            gameInfo.timeLeftToEndRound = 15;

        } else if (gameInfo.stage == 2) {
            gameInfo.stage = 3;
            gameInfo.timeLeftToEndRound = 10;

        } else if (gameInfo.stage == 3) {
            gameInfo.stage = -1;
            //koniec gry
            if(players[0].playerPoints > players[1].playerPoints) {
                console.log("wygral 1")
                players[0].playerRef.emit('end-game', 'win')
                players[1].playerRef.emit('end-game', 'lost')
                
            } else if (players[1].playerPoints > players[0].playerPoints) {
                console.log("wygral 2")
                players[1].playerRef.emit('end-game', 'win')
                players[0].playerRef.emit('end-game', 'lost')
                
            } else {
                console.log("remis")
                players[0].playerRef.emit('end-game', 'remis')
                players[1].playerRef.emit('end-game', 'remis')
            }

            clearInterval(gameInterval);
            gameStates[ROOM_NAME] = undefined;
        } else {
            clearInterval(gameInterval);
            gameStates[ROOM_NAME] = undefined;
        }
    }
    
    const gameInterval = setInterval(() => {
        gameInfo.timeLeftToEndRound -= 3
        console.log(`tl: ${gameState.gameInfo.timeLeftToEndRound}`);

        if(players[0].playerGuess !== -1 && players[1].playerGuess !== -1) {
            stageEnd();

        } else if(gameInfo.timeLeftToEndRound < 0) {
            stageEnd();
        }

        const playerState = getPlayerState(gameStates[ROOM_NAME]);
        players[0].playerRef.emit('new-game-state', JSON.stringify(playerState))
        players[1].playerRef.emit('new-game-state', JSON.stringify(playerState))
    }, 3000);
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
        console.log(`nowy gracz1 o id: ${gameStates[ROOM_NAME].players[0].playerId}`);
    } else if (player2Id === -1) {
        gameStates[ROOM_NAME].players[1].playerRef = socket 
        gameStates[ROOM_NAME].players[1].playerId = socket.id
        console.log(`nowy gracz2 o id: ${gameStates[ROOM_NAME].players[1].playerId}`);

    } else {
        socket.emit('redirect', destination)
    }


    socket.on('disconnect', () => {
        // @ trzeba dodac ze drugi gracz wygrywa ktory sie nie rozlaczy
        if (gameStates[ROOM_NAME].players[0].playerId === socket.id ) {
            gameStates[ROOM_NAME].players[0].playerId = -1
        } else {
            gameStates[ROOM_NAME].players[1].playerId = -1
        }
    });


    socket.on('user-choice', userNumber => {
        if (gameStates[ROOM_NAME].players[0].playerId === socket.id ) {
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
    if(!gameStates[ROOM_NAME].gameInfo.gameStarted
        && gameStates[ROOM_NAME].players[1].playerId !== -1) {
        gameLoop(gameStates[ROOM_NAME], ROOM_NAME);
        console.log('rozpoczelem gre');
    }
})


http.listen(4000, function() {
    console.log('Listening on port 4000')
})