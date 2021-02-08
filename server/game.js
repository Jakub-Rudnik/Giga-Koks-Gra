module.exports = {
    initGame,
}

function initGame() {
    const state = createGameState()
    return state;
}

function createGameState() {
    return {
        players: [
           {
               number: 0,
           },
           {
               number: 0,
           }
        ]
    }
}

function gameLoop(state) {
    if (!state) {
      return;
    }

    const playerOne = state.players[0];
    const playerTwo = state.players[1];
}
