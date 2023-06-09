import { localStorageScoreKey } from " https://thepebble01.github.io/Javascript-Quiz/assets/js/index-script.js";
var currentScores = JSON.parse(localStorage.getItem(localStorageScoreKey));
if (currentScores) {
  var scoreTableEl = $("#high-scores");
  for (var i = 0; i < currentScores.length; i++) {
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
} else {
  $("#score-data").text("There was an issue loading the scores.");
}
