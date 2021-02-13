function newGameState() {
    const newGameState = {
        players: [
            {
                playerGuess: -1,
                playerId: -1,
                playerRef: null,
                playerPoints: 0,
            },
            {
                playerGuess: -1,
                playerId: -1,
                playerRef: null,
                playerPoints: 0,
            },
        ],
        gameInfo: {
            maxRangeValue: 100,
            stage: 1,
            timeLeftToEndRound: 20,
            gameStarted: false,
            startTimer: false,
        },
    }

    return newGameState
}


function getPlayerState(gameState, guess) {
    if(gameState !== undefined) {
        const { gameInfo } = gameState;
    
        let header;
        switch(gameInfo.stage) {
            case 1:
                header = 'Runda pierwsza 👮‍♂️'
                break
            case 2:
                header = 'Runda druga 🚓🚓🚔'
                break
            case 3:
                header = 'Ostatnia 😎🤙🤙'
                break
            default:
                break
        } 
    
        return {
            timeLeftToEndRound: gameInfo.timeLeftToEndRound, 
            maxRangeValue: gameInfo.maxRangeValue,
            stage: gameInfo.stage,
            loading: guess > -1,
            gameStarted: gameInfo.gameStarted,
            header,
        };
    }
}

function numberComparasion(gameState) {
    const [player1, player2] = gameState.players

    if(player1.playerGuess === player2.playerGuess) return

    if(player1.playerGuess < 0) {
        player2.playerPoints += 2.5
        return
    }
    if(player2.playerGuess < 0) {
        player1.playerPoints += 2.5
        return
    }

    const diff = Math.abs(player1.playerGuess - player2.playerGuess);
    const playerNumberWin = player1.playerGuess > player2.playerGuess ? 0 : 1;
    const playerNumberLost = player1.playerGuess > player2.playerGuess ? 1 : 0;

    if (diff <= 15) {
        const pointsWin = 1 + (diff * 0,1);
        gameState.players[playerNumberWin].playerPoints += pointsWin

    } else {
        const pointsLost = gameState.players[playerNumberLost].playerGuess * 0.01
        gameState.players[playerNumberLost].playerPoints -= pointsLost
    }
}

function gameLoop(gameState, ROOM_NAME) {
    const { gameInfo, players } = gameState;

    function stageEnd() {
        numberComparasion(gameState)
        console.log("podane liczby:" + players[0].playerGuess + " " + players[1].playerGuess)
        console.log("liczba punktow:" + players[0].playerPoints + " " + players[1].playerPoints)

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
            gameState = undefined;
        } else {
            clearInterval(gameInterval);
            gameState = undefined;
        }

        players[0].playerGuess = -1;
        players[1].playerGuess = -1;
    }
    
    const gameInterval = setInterval(() => {
        gameInfo.timeLeftToEndRound -= 3
        console.log(`tl: ${gameState.gameInfo.timeLeftToEndRound}`);

        if(players[0].playerGuess !== -1 && players[1].playerGuess !== -1) {
            stageEnd();

        } else if(gameInfo.timeLeftToEndRound < 0) {
            stageEnd();
        }

        const player1State = getPlayerState(gameState, players[0].playerGuess)
        const player2State = getPlayerState(gameState, players[1].playerGuess)
        players[0].playerRef.emit('new-game-state', JSON.stringify(player1State))
        players[1].playerRef.emit('new-game-state', JSON.stringify(player2State))
    }, 3000);
}

module.exports = {
    newGameState,
    getPlayerState,
    gameLoop,
}