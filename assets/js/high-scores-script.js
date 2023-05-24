var localStorageScoreKey = "jsQuizScores"; //......NEED TO LEARN ABOUT CORS BEFORE I CAN TRY TO IMPORT/EXPORT....
var currentScores = JSON.parse(localStorage.getItem(localStorageScoreKey));
var scoreTableEl = $("#high-scores");
console.log(scoreTableEl);
for (i = 0; i < currentScores.length; i++) {
  var visitorScore = currentScores[i];
  var tableRowEl = scoreTableEl.insertRow();
  var initialsTableDataEl = tableRowEl.insertCell();
  initialsTableDataEl.textContent = visitorScore.initials;
  var scoreTableDataEl = tableRowEl.insertCell();
  scoreTableDataEl.textContent = visitorScore.score;
  var quizDateTableDataEl = tableRowEl.insertCell();
  quizDateTableDataEl.textContent = visitorScore.quizDate;
}
