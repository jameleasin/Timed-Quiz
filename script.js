//gets id from html
const question = document.getElementById('question');
//array.from will parse html selections into an array
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

//questions and choices for quiz in an array
let questions = [{
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

//on start game question counter and score is 0; availaible questions are retrived from the array using a spread operator
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

//if there are no more available questions OR the questions have reached the end of MAX_QUESTIONS (3) then the game is ended and a new window will open for the end of quiz.
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //takes the most recent score and saves score into that value
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }

    //the question counter starts at 0 and increments; questionIndex goes through the array of questions and chooses one at random according the the length of the array
    //currentQuestion will be from the available question array; The question variable will change the text in the html into the cuurent question retrieved from the function just run.
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    //reference current question by getting the question out of the array using index numbers.
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    //will iterate through choices and give a reference for each choice
    choices.forEach((choice) => {
        //will get each number assigned by the data-number in the HTML
        const number = choice.dataset['number'];
        //will change HTML text to the current questions choices using the number attribute assigned to the choice
        choice.innerHTML = currentQuestion['choice' + number];
    });
    //takes the questions we just displayed and takes it out the remaining array of questions so it is not repeated
    availableQuesions.splice(questionIndex, 1);
    //Allows user to answer questions
    acceptingAnswers = true;
};

//will iterate through choices and give a reference for each choice, adds an event listener to a mouse click, if the page is not ready for answers the page will return
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        //not accepting answers ye
        acceptingAnswers = false;
        //makes the selceted choice the event target of the mouse click
        const selectedChoice = e.target;
        //The selected answer is the selected choices data-number retrieved from the HTML
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        //if the answer is corrent the score will increment by the corrent bonus valiable
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

//score will increment and will be displayed in the html
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};