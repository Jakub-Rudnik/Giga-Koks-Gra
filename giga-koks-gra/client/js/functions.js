 let round=['pierwsza','Napierdalanka 😎😎','druga','trzecia','czwarta','piąta'];
 function changeStage(){
    gameState.header = 'Runda ' + round[0] + '👮‍♂️';
    gameHeader.innerText = gameState.header;
    mainCard.style.display = "flex";
    if(gameState.stage == 2){
    gameState.header = round[gameState.stage -1]
    gameHeader.innerText = gameState.header;
}else if(gameState.stage !== 1){ 
    gameState.header = 'Runda '+ round[gameState.stage] +'👮‍♂️'
    gameHeader.innerText = gameState.header;
}
}
function closeLoadingScreen(){
    loadingCard.style.display = "none";
    gameState.stage = 2;
    changeStage();
}
function loadingScreen(){
    mainCard.style.display = "none";
    loadingCard.style.display = "flex";
    // setTimeout(closeLoadingScreen,5000);
}