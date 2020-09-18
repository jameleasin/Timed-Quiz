# Timed-Quiz
![home](https://user-images.githubusercontent.com/62285850/93594309-2ebba600-f9e8-11ea-8dbb-44e6c9888ac3.JPG)
![quiz](https://user-images.githubusercontent.com/62285850/93596266-9de6c980-f9eb-11ea-84b8-9fd8b49adf64.JPG)
![highscore](https://user-images.githubusercontent.com/62285850/93596385-cd95d180-f9eb-11ea-9289-886732d271e5.JPG)
![end](https://user-images.githubusercontent.com/62285850/93596395-d1c1ef00-f9eb-11ea-9670-628c0fecb176.JPG)
<br />
Deploy Application Here: https://jameleasin.github.io/Timed-Quiz/.
<p>
This application is a timed quiz that gives the user four interfaces. The home page navigates to either the quiz or the highscore page.
The quiz page starts a timer on load starting at 30 secs. The user is given 6 questions each with multiple choice answers. The questions are tracked dynamically using javascript in a progress bar displayed using html. When a correct answer is selected a score of +10 is given to the user, which is displayed dynamically on the html. If an incorrect answer is selected the timer decreases by 5, which is also displayed dynamically through html.
</p>
<p>
Once the timer has reached 0 or the question counter has reached more than the available questions the timer stops and the user is redirected to the end page.
On the end page the user is able to input their name, the user is unable to save the input until there is an input placed into the input area. The users score is displayed on screen and then is stored in local storage once the save button is pressed. The user is able to navigate to the home page or the quiz page to replay the quiz.
The highscore page can be navigated to from the home page. The highscore page displays the top five highscores, retrieving the scores from the local storage and pushing the most recent score to the top of the list.
</p>

