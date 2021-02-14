function openStage() {
    timer.innerHTML = "⏰ Pozostało: " + gameState.timeLeftToEndRound + " sekund";
    modifyStage();
    stageSlider();
    mainCard.style.display = "flex";
    setInterval(setTimer,1000);
}
function modifyStage(){
    if(gameState.stage == 1){
        czas =20;
    }
    if(gameState.stage == 2){  
        czas =15;
    }
    if(gameState.stage == 3){  
        czas =10;
    }
}
function closeLoadingScreen() {
    loadingCard.style.display = "none";
    openStage();
}
function loadingScreen() {
    mainCard.style.display = "none";
    loadingCard.style.display = "flex";
}
function setTimer(){
    gameHeader.innerText = gameState.header;
    timer.innerHTML = "⏰ Pozostało: " + czas + " sekund";
    if(czas < 5){
        timer.innerHTML = "⏰ Pozostało: " + czas + " sekundy";
    }if(czas == 1){
        timer.innerHTML = "⏰ Pozostało: " + czas + " sekunda";
    }
    if(czas>0) { 
        czas--;
    }
}
