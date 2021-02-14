// Global state
const socket = io('http://127.0.0.1:4000');
let gameState = {
    maxRangeValue: 100,
    stage: 1,
    header: 'Runda pierwsza 👮‍♂️',
    isLoadingData: false,
}
// Events listeners
// Client side listeners
userNumber.addEventListener('keyup', () => {
    const number = Number(userNumber.value)
    if(isNaN(number)) {
        userNumber.value = "";
        errorFn();
    }if(number < 0 ||number > gameState.maxRangeValue ){
        userNumber.value = userNumber.value.slice(0,2);
        errorFn();
    }if (number == 0 || userNumber.value.slice(0,1) == 0){
        userNumber.value = "";
        errorFn();
    }

})
gameSubmit.addEventListener('click', event => {
    event.preventDefault();
    
    // if(gameState.isLoadingData) return
    // gameState.isLoadingData = true
    // gameState.stage = -1
    socket.emit('user-choice', parseInt(userNumber.value))
    console.log('wyslalem');
    openStage();
    loadingScreen();
})
userNumber.addEventListener('focus',()=>{
    userNumber.classList.add("input__focus");
})
// Server side listeners
socket.on('new-game-state', newGameStateString => {
    gameState = JSON.parse(newGameStateString);
})

socket.on('game-end', amIWinner => {
    if (amIWinner) alert('wygrałeś!');
})
//start functions
openStage();