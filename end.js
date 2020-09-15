  const username = document.getElementById('username');
  const saveScoreBtn = document.getElementById('saveScoreBtn');
  const finalScore = document.getElementById('finalScore');
  //gets score from local storage
  const mostRecentScore = localStorage.getItem('mostRecentScore');
  //changes the text on screen to the most recent score
  finalScore.innerText = mostRecentScore;

  const HIGH_SCORE_MAX = 5;
  //saves highscores into local storage, JSON will put the array into an object, if there is no scoreing return an empty array
  var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  //disblaes the save button until the user inputs a user name
  username.addEventListener('keyup', () => {
      saveScoreBtn.disabled = !username.value;
  });

  saveHighScore = (e) => {
      //prevents the save button from refreshing the page
      e.preventDefault();

      const score = {
          score: mostRecentScore,
          name: username.value,
      };
      //will push highscore to the front of the array
      highScores.push(score);
      //built in JS to sort through arrays
      highScores.sort((a, b) => b.score - a.score);
      highScores.splice(5);
      //puts the high scores into the local storage and puts them into a string
      localStorage.setItem('highScores', JSON.stringify(highScores));
      //returns to home page once done
      window.location.assign('index.html');
  };