const quizQuestions = [
  //CHECK README FOR # Q's PROMISED
  new QuizQuestion("bibidy?", ["bob", "idy", "boo"], "boo"),
  new QuizQuestion("bibidy 2?", ["bob 2", "idy 2", "boo 2"], "idy 2"),
];
document.getElementById("start-quiz").addEventListener("click", startQuiz);
var timerEl = document.getElementById("quiz-timer");
var welcomeEl = document.getElementById("welcome-container");
var quizEl = document.getElementById("quiz-question-container");
var quizQuestionEl = document.getElementById("quiz-question");
var answerOptions = document.getElementById("options");
var quizAnswerResult = document.getElementById("answer-result");
var applicationState = "welcome-page"; //quiz, save score, view scores
var initialSecondsRemaining = 60;
function startQuiz() {
  startTimer();
  welcomeEl.style.display = "none";
  quizEl.style.display = "block";
  //REPLACE WITH PROGRESS FUNCTION
  setQuizQuestion(quizQuestions[0]);
}
function progressQuestions() {
  //parent function that iterates over question array
  //also displays correct or wrong based on response
  //calls setQuizQuestion
}
function setQuizQuestion(questionObj) {
  quizQuestionEl.textContent = questionObj.question;
  for (i = 0; i < questionObj.options.length; i++) {
    var quizOption = document.createElement("li");
    quizOption.textContent = questionObj.options[i];
    quizOption.value = i + 1;
    answerOptions.appendChild(quizOption);
  }
}
document.getElementById("wrong").addEventListener("click", deductTime);
function deductTime() {
  //fake function, logic will simply be called based on the evaluation of an answer
  initialSecondsRemaining -= 4; //setInterval will still execute and deduct a second...
}
function startTimer() {
  var quizTimer = setInterval(function () {
    initialSecondsRemaining--;
    timerEl.textContent = initialSecondsRemaining;
    if (initialSecondsRemaining == 0) {
      //MAKE STRICT BASED ON FEEDBACK FROM MOD 3...I WRITE THE VARS I KNOW WHAT TYPE THEY ARE
      clearInterval(quizTimer);
      //change state
    }
  }, 1000);
}

function QuizQuestion(question, options, answer) {
  this.question = question;
  this.options = options;
  this.answer = answer;
}
