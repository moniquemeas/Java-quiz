var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: "Commonly used data types DO not Include:",
        choice1: "alerts",
        choice2: "strings",
        choice3: "booleans",
        choice4: "numbers",
        answer: 1
    },
    {
        question: "Arrays in JavaScript can be used to store _________.",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "The condition in an if/else statement is enclosed with _________.",
        choice1: "quotes",
        choice2: "parenthesis",
        choice3: "curly brackets",
        choice4: "square brackets",
        answer: 2
    },
    {
        question: "String values must be enclosed within________ when being assigned to variables.",
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parenthesis",
        answer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2: "teminal/bash",
        choice3: "console.log",
        choice4: "for loops",
        answer: 3
    },

]
var count = 60;
var bonus_score = 10;
var NumberQuestion = 5;
var penaltyTime = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
    countdown();
    
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= NumberQuestion) {
        //save score to local storage
        localStorage.setItem("mostRecentScore", score);

        // got to the end of page
        return window.location.assign ("./result.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + NumberQuestion;
    var questionIndex = Math.floor(Math.random() * availableQuestions.length );
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];

    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;  
    var selectedChoice = e.target
    var selectedAnswer = selectedChoice.dataset['number'];

    var classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
    // if it is a correct answer add 10 to score
    if(classToApply === 'correct'){
        score += bonus_score;
        
    }
    // it it's not correct minus 10 
    else {
        score -= bonus_score;
        count -= penaltyTime;

    }
    scoreText.innerText = score;
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout ( () => {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
    }, 1000);
    })
})
var timerText = document.getElementById("timer");

function countdown() {
    
  
    //assign variable to a function 
    var timeInterval = setInterval(function () {
  
      
    // if count is greater than 1, set to text content to timeerEL, and decrease count by 1
      if (count > 1) {
        timerText.textContent = count + ' seconds remaining';
        count--;
        
      } 
    else if (count === 1) {
    timerText.textContent = count + ' second remaining';
    count--;
      } 
      else {
        timerText.textContent = "Your're out of time!";
        clearInterval(timeInterval);
        return window.location.assign("./result.html");
    }
    }, 1000);
  };

  

startGame();


