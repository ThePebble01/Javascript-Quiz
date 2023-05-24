var localStorageScoreKey = "jsQuizScores"; //......NEED TO LEARN ABOUT CORS BEFORE I CAN TRY TO IMPORT/EXPORT....
var currentScores = JSON.parse(localStorage.getItem(localStorageScoreKey));
var scoreTableEl = $("#high-scores");
for (i = 0; i < currentScores.length; i++) {
  var visitorScore = currentScores[i];
  var tableRowEl = $("<tr>");

  var initialsTableDataEl = $("<td>");
  initialsTableDataEl.text(visitorScore.initials);
  tableRowEl.append(initialsTableDataEl);

  var scoreTableDataEl = $("<td>");
  scoreTableDataEl.text(visitorScore.score);
  tableRowEl.append(scoreTableDataEl);

  var quizDateTableDataEl = $("<td>");
  quizDateTableDataEl.text(visitorScore.quizDate);
  tableRowEl.append(quizDateTableDataEl);

  scoreTableEl.append(tableRowEl);
}
