function newGameState() {
    const newGameState = {
        players: [
            {
                playerGuess: -1,
                playerId: -1,
                playerRef: null,
            },
            {
                playerGuess: -1,
                playerId: -1,
                playerRef: null,
            },
        ],
        gameInfo: {
            maxRangeValue: 100,
            stage: 1,
            timeLeftToEndRound: 10,
            gamestarted: false,
            startTimer: false,
        },
    }

    return newGameState
}

function getPlayerState(gameState) {
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
        maxRangeValue: gameInfo.maxRangeValue,
        stage: gameInfo.stage,
        header,
    };
}

module.exports = {
    newGameState,
    getPlayerState,
}