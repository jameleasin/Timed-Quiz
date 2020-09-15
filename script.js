//gets id from html
console.log("hello");
const question = document.getElementById('question');
//array.from will parse html selections into an array
const choices = Array.from(document.getElementsByClassName('choice-text'));
//for HUD
var questionCounterText = document.getElementById("questioncounter");
var scoreText = document.getElementById("score");

let currentQuestion = {};
//stops user answering questions before page is loaded
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

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
};

//if there are no more available questions OR the questions have reached the end of MAX_QUESTIONS (3) then the game is ended and a new window will open for the end of quiz.
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("end.html");
    }


    //the question counter starts at 0 and increments; questionIndex goes through the array of questions and chooses one at random according the the length of the array
    //currentQuestion will be from the available question array; The question variable will change the text in the html into the cuurent question retrieved from the function just run.
    questionCounter++;

    //for HUD, displays what questions the user is one out of the maximum questions in the quiz
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    //reference current question by getting the question out of the array
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    //will iterate through choices and give a reference for each choice
    choices.forEach((choice) => {
        //will get each number assigned by the data-number in the HTML
        const number = choice.dataset['number'];
        //will change HTML text to the current questions choices using the number attribute assigned to the choice
        choice.innerText = currentQuestion['choice' + number];
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

        //not accepting answers yet
        acceptingAnswers = false;
        //makes the selceted choice the event target of the mouse click
        const selectedChoice = e.target;
        //The selected answer is the selected choices data-number retrieved from the HTML
        const selectedAnswer = selectedChoice.dataset['number'];
        //will load new question after a selection is made
        getNewQuestion();
    });
});

startGame();