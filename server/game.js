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

module.exports = {
    newGameState,
    getPlayerState,
}