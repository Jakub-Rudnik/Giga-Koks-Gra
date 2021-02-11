function newGameState() {
    const newGameState = {
        players: [
            {
                playerGuess: -1,
                playerId: -1,
                playerRef: null,
                playerPoints: -1,
            },
            {
                playerGuess: -1,
                playerId: -1,
                playerRef: null,
                playerPoints: -1,
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


function getPlayerState(gameState) {
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
            default:
                break
        } 
    
        return {
            timeLeftToEndRound: gameInfo.timeLeftToEndRound, 
            maxRangeValue: gameInfo.maxRangeValue,
            stage: gameInfo.stage,
            header,
        };
    }
}


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
            gameState = undefined;
        } else {
            clearInterval(gameInterval);
            gameState = undefined;
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

        const playerState = getPlayerState(gameState);
        players[0].playerRef.emit('new-game-state', JSON.stringify(playerState))
        players[1].playerRef.emit('new-game-state', JSON.stringify(playerState))
    }, 3000);
}

module.exports = {
    newGameState,
    getPlayerState,
    gameLoop,
}