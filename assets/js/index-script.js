/*
TODO: GET THIS WORKING, THEN SWAP WITH JQUERY

UPDATE IDS AND VAR NAMES TO REF SOURCE TAG/ELM


BUTTON INVOKED FUNCTIONS GET HANDLE___ AT START OF NAME

LISTENERS GO TO BOTTOM; ADD SECTION FOR IT
*/

const quizQuestions = [
  //CHECK README FOR # Q's PROMISED
  new QuizQuestion(
    "What character separates individual javascript statements?",
    [":", ";", ".", "-"],
    ";"
  ),
  new QuizQuestion(
    "What are groups of javascript statements called?",
    ["families", "sets", "groups", "blocks"],
    "blocks"
  ),
  new QuizQuestion(
    "Which method allows you to access an HTML element by its Id?  (No JQuery)",
    ["$(\"#Id\")", "getElement(\"Id\")", "gimmeEl(\"#Id\")", "getElementById(\"Id\")"],   // PRETTTTTTIER!    CTRL + '
    "getElementById(\"Id\")"
  ),
];
const localStorageScoreKey = "jsQuizScores";

var welcomeEl = $("#welcome-container");
var quizEl = $("#quiz-question-container");
var saveScoreEl = $("#save-score");
var quizTimeRemainingEl = $("#quiz-timer"); // Does this make sense as a local var?  $ points, but needs to re-retrieve each second...

var initialSecondsRemaining = 60; //rename
var currentQuestionIndex = -1;
var score = 0;

function handleStartQuiz(event) {
  event.preventDefault();
  startTimer();
  changePageState(welcomeEl, quizEl);
  progressQuestions();
}

function handleQuizAnswer(event) {
  event.preventDefault(); //?
  console.log(event.target.textContent);
  var answerResult = "";
  if (quizQuestions[currentQuestionIndex].answer === event.target.textContent) {
    answerResult = "Correct!";
    score++;
  } else {
    answerResult = "Wrong!";
    initialSecondsRemaining -= 4; //The penalty is 5 seconds, the timer will continue to deduct one....no need to increment the visitor's pain by reducing the total seconds by 5
  }
  $("#answer-result").text(answerResult);
  progressQuestions();
}

function handleSaveScore(event) {
  event.preventDefault();
  var visitorScore = new VisitorScore($("initials").val().trim(), score);
  var currentScores = [];
  var localStorageScore = localStorage.getItem(localStorageScoreKey);
  if (localStorageScore) {
    currentScores = JSON.parse(localStorageScore);
    console.log(currentScores);
  }
  currentScores.push(visitorScore);
  localStorage.setItem(localStorageScoreKey, JSON.stringify(currentScores));
  changePageState(saveScoreEl, welcomeEl); //Redirect to high score page?
}

function progressQuestions() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    $("li").remove();
    setQuizQuestion(quizQuestions[currentQuestionIndex]);
  } else {
    //The visitor has progressed through all the questions.
    changePageState(quizEl, saveScoreEl);
    $("#final-score").text(score);
  }
}

function setQuizQuestion(questionObj) {
  $("#quiz-question").text(questionObj.question);
  for (i = 0; i < questionObj.options.length; i++) {
    var quizOption = $("<li>");
    quizOption.text(questionObj.options[i]);
    quizOption.val(i + 1);
    $("#options").append(quizOption);
  }
}

function startTimer() {
  var quizTimer = setInterval(function () {
    initialSecondsRemaining--;
    quizTimeRemainingEl.text(initialSecondsRemaining);
    if (initialSecondsRemaining == 0) {
      //MAKE STRICT BASED ON FEEDBACK FROM MOD 3...I WRITE THE VARS I KNOW WHAT TYPE THEY ARE
      clearInterval(quizTimer);
      //change state TO SCORE
    }
  }, 1000);
}

function changePageState(initialEl, nextEl) {
  if (initialEl) initialEl.css("display", "none");
  if (nextEl) nextEl.css("display", "block");
}

// Event Listeners
$("#start-quiz").on("click", handleStartQuiz);

$("ol").on("click", "li", handleQuizAnswer);

$("#submit-score").on("click", handleSaveScore); //when swapping with form, use "submit" as the event

// Object Definitions
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
