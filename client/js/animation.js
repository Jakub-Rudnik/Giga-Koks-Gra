let animation = anime.timeline({
    duration: 800,
    easing: 'linear',
    direction: 'normal',
})
let animation2 = anime.timeline({
    duration: 300,
    easing: 'linear',
    direction: 'normal',
})
function errorFn(){
    animation.add({
        targets: userNumber,
        keyframes:[
        {translateX: 50, borderColor:'#ca4747'},
        {translateX: -50, borderColor:'#ca4747'},
        {translateX: 0,borderColor:'#b18597'},
        ],
    });
};
function stageSlider(){
    animation2.add({
        targets:loadingCard,
        opacity:1,
        height: "450px",
    })
        animation2.add({
        targets:mainCard,
        opacity:1,
        height:"450px",
    })
}