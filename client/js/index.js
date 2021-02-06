// Global state
const gameState = {
    maxRangeValue: 100,
    stage: 1,
    header: 'Runda pierwsza 👮‍♂️',
    isLoadingData: false,
}


// Methods
function setBoard(gameInfo) {
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
    gameState.isLoadingData = true;

    // @Todo request api call with userNumber.value
})
// Server side listeners
// @ Todo wait for api call with new gameState and use it in setBoard method


setBoard(gameState)