// Global state
const socket = io('localhost:3000');
const gameState = {
    maxRangeValue: 100,
    stage: 1,
    header: 'Runda pierwsza 👮‍♂️',
    isLoadingData: false,
}
// Events listeners
// Client side listeners
userNumber.addEventListener('keyup', () => {
    const number = parseInt(userNumber.value)

    if(isNaN(number)) {
        userNumber.value = ''
    }if(number > 999){
        userNumber.value = userNumber.value.slice(0,3)
    }else if(number < 0 || number > gameState.maxRangeValue) {
        userNumber.value = userNumber.value.slice(0,2)
    }
})

gameSubmit.addEventListener('click', event => {
    event.preventDefault();
    
    if(gameState.isLoadingData) return
    gameState.isLoadingData = true
    gameState.stage = -1
    socket.emit('user-choice', parseInt(userNumber.value))
    changeStage()
    loadingScreen()
})

// Server side listeners
socket.on('new-game-state', newGameState => {
    gameState = {...newGameState};
    changeStage()
})

socket.on('game-end', amIWinner => {
    if (amIWinner) alert('wygrałeś!');
})


// This is where code start
changeStage()