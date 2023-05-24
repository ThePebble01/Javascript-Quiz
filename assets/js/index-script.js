const quizQuestions = [
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
    ['$("#Id")', 'getElement("Id")', 'gimmeEl("#Id")', 'getElementById("Id")'], // PRETTTTTTIER REMOVED MY ESCAPES FOR DOUBLE QUOTES!
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
    "A variable declared without also assigning a value to it is assigned which default value?",
    [
      "null",
      "' ' (space character...but not this explanaition of the option)",
      "undefined",
      "NA",
    ],
    "undefined"
  ),
  new QuizQuestion(
    "Which characters identify an array in javascript?",
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
    "No"
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
var quizEl = $("#quiz-question-container");
var saveScoreEl = $("#save-score-container");
var quizTimeRemainingEl = $("#quiz-timer"); //Declared as a global var to avoid minor delay with the JQuery pointer re-retrieving this element.
var secondsRemaining = 60;
var currentQuestionIndex = -1;
var score = 0;

// Event Handlers
function handleStartQuiz(event) {
  event.preventDefault();
  startTimer();
  changePageState($("#welcome-container"), quizEl);
  progressQuestions();
}

function handleQuizAnswer(event) {
  event.preventDefault();
  var answerResult = "";
  if (quizQuestions[currentQuestionIndex].answer === event.target.textContent) {
    answerResult = "The prior answer was correct!";
    score++;
  } else {
    answerResult = "The prior answer was wrong!";
    secondsRemaining -= 4; //The penalty is 5 seconds, the timer will continue to deduct 1....no need to increment the visitor's pain.
  }
  $("#answer-result").text(answerResult);
  progressQuestions();
}

function handleSaveScore(event) {
  event.preventDefault();
  var visitorScore = new VisitorScore($("#initials").val().trim(), score);
  var currentScores = [];
  var localStorageScore = localStorage.getItem(localStorageScoreKey);
  if (localStorageScore) {
    currentScores = JSON.parse(localStorageScore);
  }
  currentScores.push(visitorScore);
  localStorage.setItem(localStorageScoreKey, JSON.stringify(currentScores));
  window.location.href = "./high-scores.html";
}
// Supporting Function
function progressQuestions() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    $("li").remove();
    setQuizQuestion(quizQuestions[currentQuestionIndex]);
  } else {
    changePageState(quizEl, saveScoreEl);
    $("#final-score").text(score);
  }
}

function setQuizQuestion(questionObj) {
  $("#quiz-question").text(questionObj.question);
  for (i = 0; i < questionObj.options.length; i++) {
    var quizOption = $("<li>");
    quizOption.addClass("list-group-item");
    quizOption.addClass("list-group-item-action");
    quizOption.text(questionObj.options[i]);
    $("#options").append(quizOption);
  }
}

function startTimer() {
  var quizTimer = setInterval(function () {
    secondsRemaining--;
    quizTimeRemainingEl.text(secondsRemaining);
    if (secondsRemaining <= 0) {
      secondsRemaining = secondsRemaining < 0 ? 0 : secondsRemaining; //Clear negative seconds for aesthetics on the save screen
      clearInterval(quizTimer);
      changePageState(quizEl, saveScoreEl);
      $("#final-score").text(score);
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
