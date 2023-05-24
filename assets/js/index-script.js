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
    ['$("#Id")', 'getElement("Id")', 'gimmeEl("#Id")', 'getElementById("Id")'], // PRETTTTTTIER!
    'getElementById("Id")'
  ),
  new QuizQuestion(
    "Given two variables, which operator allows you to compare their values, as well as data type, to check if they are equal?",
    ["==", "===", "=!=", "<=>"],
    "==="
  ),
  new QuizQuestion(
    "Given the following function definition, select the option that would allow you to invoke it. function halp(){console.log('Help me!')}",
    ["run halp", "halp[]", "halp()", "eval halp"],
    "halp()"
  ),
  new QuizQuestion(
    "Given the function definition: function example(a, b){}, what are a and b called?",
    ["Parameters", "Arguments"],
    "Parameters"
  ),
  new QuizQuestion(
    "Which of the following is NOT a data type in javascript?",
    ["Boolean", "Decimal", "Object", "undefined"],
    "Decimal"
  ),
  new QuizQuestion(
    "Which value is falsy?",
    ["1", "0.1", "undefined", "nah"],
    "undefined"
  ),
  new QuizQuestion(
    "Which character can break up a code line within a string?",
    ["\\", "/", "|", "<!-- -->"],
    "\\"
  ),
  new QuizQuestion(
    "A variable declared without a value defined is assigned which value?",
    [
      "null",
      "' ' (space character...but not this explanaition of the option)",
      "undefined",
      "NA",
    ],
    "undefined"
  ),
  new QuizQuestion(
    "What characters identify an array in javascript?",
    ["{}", "||", "[]", "<>"],
    "[]"
  ),
  new QuizQuestion(
    "As a best practice, where should global variables be declared?",
    [
      "Just before the first function declariation where its declared.",
      "At the bottom of the .js file.",
      "At the top of the .js file.",
      "In a .js module, imported into any files where they are needed.",
    ],
    "At the top of the .js file."
  ),
  new QuizQuestion(
    "What literal values can a boolean variable have?",
    ["Stasis / Chaos", "Void / Creation", "False / True", "1 / 2"],
    "False / True"
  ),
  new QuizQuestion(
    "Given the array var alpha = ['a','b','c','d'], which option is a valid way to access element c?",
    ["alpha[3]", "alpha[2]", "alpha.get(3)", "alpha.return(2)"],
    "alpha[2]"
  ),
  new QuizQuestion(
    "Using an explicit object definition, the object's properties are defined as _______ and _______.",
    [
      "name, value pairs",
      "attribute, value pairs",
      "var, thingy pairs",
      "property var, value pairs",
    ],
    "name, value pairs"
  ),
  new QuizQuestion(
    "Given an object's name, which character allows you to access its properties?",
    [",", "-", ">", "."],
    "."
  ),
  new QuizQuestion(
    "What is the name of a block of code, defined globally, that will only run when called?",
    ["method", "function", "doer", "exeggutor"],
    "function"
  ),
  new QuizQuestion(
    "Can a variable declared within a function be accessed outside of it?",
    ["Yes", "No"],
    "Yes"
  ),
  new QuizQuestion(
    "Variables declared outside of a function are ________.",
    ["universal", "titans", "global", "file-local"],
    "global"
  ),
  new QuizQuestion(
    "Which character is used for the modulus operator?",
    ["/", "#", "%", "&"],
    "%"
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
  console.log($("initials").val());
  var visitorScore = new VisitorScore($("initials").val(), score);
  var currentScores = [];
  var localStorageScore = localStorage.getItem(localStorageScoreKey);
  if (localStorageScore) {
    currentScores = JSON.parse(localStorageScore);
    console.log(currentScores);
  }
  currentScores.push(visitorScore);
  localStorage.setItem(localStorageScoreKey, JSON.stringify(currentScores));
  window.location.href = "./high-scores.html";
  //changePageState(saveScoreEl, welcomeEl); ?Redirect to high score page works on G Pages?
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
