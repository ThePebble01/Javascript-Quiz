const quizQuestions = [
  //CHECK README FOR # Q's PROMISED
  new QuizQuestion("bibidy?", ["bob", "idy", "boo"], "boo"),
  new QuizQuestion("bibidy 2?", ["bob 2", "idy 2", "boo 2"], "idy 2"),
];
document.getElementById("start-quiz").addEventListener("click", startQuiz);
var timer = document.getElementById("quiz-timer");
var applicationState = "welcome-page"; //quiz, save score, view scores
var initialSecondsRemaining = 60;
function startQuiz() {
  console.log("woot, js");
  startTimer();
}
document.getElementById("wrong").addEventListener("click", deductTime);
function deductTime() {
  //fake function, logic will simply be called based on the evaluation of an answer
  initialSecondsRemaining -= 4; //setInterval will still execute and deduct a second...
}
function startTimer() {
  var quizTimer = setInterval(function () {
    initialSecondsRemaining--;
    timer.textContent = initialSecondsRemaining;
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
