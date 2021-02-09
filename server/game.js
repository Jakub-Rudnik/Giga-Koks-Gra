function newGameState() {
    const newGameState = {
        maxRangeValue: 100,
        stage: 1,
        player1Guess: -1,
        player1Id: -1,
        player2Guess: -1,
        player2Id: -1,
        timeLeftToEndRound: 10,
        startTimer: false,
    }

    return newGameState
}

function getPlayerState(gameState) {
    let header;
    switch(gameState.stage) {
        case 1:
            header = 'Runda pierwsza 👮‍♂️';
            break;
        case 2:
            header = 'Runda druga 🚓🚓🚔';
            break;
        default:
            break;
    } 
    
    const returnState = {
        maxRangeValue: gameState.maxRangeValue,
        stage: gameState.stage,
        header,
    };

    return returnState
}

module.exports = {
    newGameState,
    getPlayerState,
}