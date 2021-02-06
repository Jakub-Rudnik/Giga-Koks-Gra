// Global state
const gameData = {
    maxRangeValue: 100,
    stage: 1,
    header: 'Runda pierwsza 👮‍♂️',
}

// Methods
function setBoard(gameInfo) {
    gameHeader.innerText = gameInfo.header;
}

// Events listeners
userNumber.addEventListener('keyup', () => {
    const number = parseInt(userNumber.value)

    if(isNaN(number)) {
        userNumber.value = ''
    } else if (number < 0 || number > gameData.maxRangeValue) {
        userNumber.value = userNumber.value.slice(0,2)
    }
});

setBoard(gameData)