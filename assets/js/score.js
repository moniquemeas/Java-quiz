var username = document.getElementById('username');
var submitScore= document.getElementById('submitScore');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    
    submitScore.disabled = !username.value;
});
saveHighScore = e => {
    console.log("Clicked the button.");
    e.preventDefault();

    var score = {
        score: mostRecentScore,
        name: username.value
    };
    highScore.push(score);

    // sort the top 5 high score
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(5);

    localStorage.setItem("highScore", JSON.stringify(highScore));
    window.location.assign("./highscore.html");
    console.log(highScore);

};
