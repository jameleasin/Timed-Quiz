  const username = document.getElementById('username');
  const saveScoreBtn = document.getElementById('saveScoreBtn');
  const finalScore = document.getElementById('finalScore');
  const mostRecentScore = localStorage.getItem('mostRecentScore');
  finalScore.innerText = mostRecentScore;

  //disblaes teh save button until the user inputs a user name
  username.addEventListener('keyup', () => {
      saveScoreBtn.disabled = !username.value;
  });

  saveHighScore = (e) => {
      //prevents the save button from refreshing the page
      e.preventDefault();
  };