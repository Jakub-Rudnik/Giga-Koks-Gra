// Global state
const socket = io('localhost:3000');
const gameState = {
    maxRangeValue: 100,
    stage: 1,
    header: 'Runda pierwsza 👮‍♂️',
    isLoadingData: false,
}


// Methods
function setBoard(gameInfo) {
    //@Todo switch on gameState change, and display loading spinner or another titles:DDD
    gameHeader.innerText = gameInfo.header;
}


// Events listeners
// Client side listeners
userNumber.addEventListener('keyup', () => {
    const number = parseInt(userNumber.value)

    if(isNaN(number)) {
        userNumber.value = ''
    } else if (number < 0 || number > gameState.maxRangeValue) {
        userNumber.value = userNumber.value.slice(0,2)
    }
})

gameSubmit.addEventListener('click', event => {
    event.preventDefault();
    
    if(gameState.isLoadingData) return
    gameState.isLoadingData = true
    gameState.stage = -1

    socket.emit('user-choice', parseInt(userNumber.value))
    setBoard(gameState)
})

// Server side listeners
socket.on('new-game-state', newGameState => {
    gameState = {...newGameState};
    setBoard(gameState)
})

socket.on('game-end', amIWinner => {
    if (amIWinner) alert('wygrałeś!');
})


// This is where code start
setBoard(gameState)