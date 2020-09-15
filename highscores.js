//gets reference from html
var highScoresList = getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores
    //iterate through scores, .map takes the array and allows it to be turned into something else
highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");