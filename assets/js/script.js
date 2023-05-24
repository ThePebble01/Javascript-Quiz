/*
TODO: GET THIS WORKING, THEN SWAP WITH JQUERY

UPDATE IDS AND VAR NAMES TO REF SOURCE TAG/ELM


BUTTON INVOKED FUNCTIONS GET HANDLE___ AT START OF NAME

LISTENERS GO TO BOTTOM; ADD SECTION FOR IT
*/

const quizQuestions = [
  //CHECK README FOR # Q's PROMISED
  new QuizQuestion("bibidy?", ["bob", "idy", "boo"], "boo"),
  new QuizQuestion("bibidy 2?", ["bob 2", "idy 2", "boo 2"], "idy 2"),
];
var localStorageScoreKey = "jsQuizScores";
var timerEl = document.getElementById("quiz-timer");
var welcomeEl = document.getElementById("welcome-container");
var quizEl = document.getElementById("quiz-question-container");
var quizQuestionEl = document.getElementById("quiz-question");
var answerOptionsEl = document.getElementById("options");
var quizAnswerResultEl = document.getElementById("answer-result");
var showScoresEl = document.getElementById("show-scores");
var currentApplicationState = "welcome-page"; //TRACK BASED ON F() CALLS   quiz, save score, view scores
var initialSecondsRemaining = 60; //rename

document.getElementById("start-quiz").addEventListener("click", startQuiz);
function startQuiz(event) {
  event.preventDefault(); //ADDED W/O TESTING
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
    answerOptionsEl.appendChild(quizOption);
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
      //change state TO SCORE
    }
  }, 1000);
}
var score = 3.141592; //move to top!
document.getElementById("submit-score").addEventListener("click", saveScore); //when swapping with form, use "submit" as the event

var visitorInitials = document.getElementById("initials"); //with jquery use .val()  CLEAN BEFORE ADDING
function saveScore(event) {
  event.preventDefault();
  var visitorScore = new VisitorScore(visitorInitials.value, score);
  var currentScores = [];
  var localStorageScore = localStorage.getItem(localStorageScoreKey);
  if (localStorageScore) {
    currentScores = JSON.parse(localStorageScore);
    console.log(currentScores);
  }
  currentScores.push(visitorScore);
  localStorage.setItem(localStorageScoreKey, JSON.stringify(currentScores));
  //STATE TRANSITION
}
document
  .getElementById("high-score-link")
  .addEventListener("click", showScores);
function showScores(event) {
  event.preventDefault();
  showScoresEl.style.display = "inline";
  currentScores = JSON.parse(localStorage.getItem(localStorageScoreKey));
  var scoreTableEl = document.getElementById("high-scores");
  console.log(scoreTableEl);
  for (i = 0; i < currentScores.length; i++) {
    var visitorScore = currentScores[i];
    var tableRowEl = scoreTableEl.insertRow();
    console.log(tableRowEl);
    var initialsTableDataEl = tableRowEl.insertCell();
    initialsTableDataEl.textContent = visitorScore.initials;
    var scoreTableDataEl = tableRowEl.insertCell();
    scoreTableDataEl.textContent = visitorScore.score;
    var quizDateTableDataEl = tableRowEl.insertCell();
    quizDateTableDataEl.textContent = visitorScore.quizDate;
    console.log(tableRowEl);
  }
}
//format table function
function QuizQuestion(question, options, answer) {
  this.question = question;
  this.options = options;
  this.answer = answer;
}
function VisitorScore(initials, score) {
  this.initials = initials;
  this.score = score;
  this.quizDate = Date();
}
