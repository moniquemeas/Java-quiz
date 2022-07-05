var highScoreList = document.getElementById('highScoreList');
var highScore = JSON.parse(localStorage.getItem('highScore')) || [];
var clearScore = document.getElementById('clearScore');

console.log(highScore);

highScoreList.innerHTML = highScore
.map( score => {
    return (`<li class= "high-score">${score.name}-${score.score}</li>`);
})
.join("");

clearData = e => {
    highScoreList.innerHTML = ''
    clearScore = localStorage.clear("highscore")
};
