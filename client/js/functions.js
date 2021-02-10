function openStage() {
    gameHeader.innerText = gameState.header;
    mainCard.style.display = "flex";
}
function closeLoadingScreen() {
    loadingCard.style.display = "none";
    openStage();
}
function loadingScreen() {
    mainCard.style.display = "none";
    loadingCard.style.display = "flex";
    // setTimeout(closeLoadingScreen, 5000);
}

