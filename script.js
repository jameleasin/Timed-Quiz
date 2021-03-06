const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
var count = 30;

//hard codes questions and answers, choices for the questions are given numbers in html and are called upon using data-number
let questions = [{
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
    {
        question: " How do you select a class when writing Javascript",
        choice1: "#",
        choice2: "selectClass",
        choice3: "class.select",
        choice4: "(#)",
        answer: 1
    },
    {
        question: "What does stopPropagation(); do in Javascript",
        choice1: "stops the page from loading",
        choice2: "stops events",
        choice3: "stops the bubbling of an event to parent elements",
        choice4: "stops functions working",
        answer: 3
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    //timer starts at 30 secs
    var count = 30;
    var time = setInterval(myTimer, 1000);
    //timer decrements by 1
    function myTimer() {
        document.getElementById('count').innerHTML = count;
        count--;
        //when timer is less than 1 an alert shows and time is up
        if (count == -1) {
            clearInterval(time);
            alert("Time out!! :(");
        }
    };

    //Were the choices are allocated an event listener and correct and incorrect are decided
    //an event listener is given to a mouse click, if the page is not accepting answers the answers clicked will not be coonsidered
    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;
            //when the selected choice is targeted it used the data-number in the html
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];

            const classToApply =
                selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            //if the selected choice is incorrect the score does not incriment and the question is timed out, then a new question is displayed
            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            } else if (classToApply === "incorrect") {
                count -= 5;
            };

            //classToApply is added to the selected choices parent elements class list 
            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

//if the available questions are equal to 0 OR the question counter is more than the max questions the game will return to the end page, shoing the most recent score in local sotrage
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    //when the user goes through each question the question counter will increment, the progress text in the html will change according to the question the user is on out of the max questions in the game
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    //the game will randomly choose the questions based on its index number * by the number of questions in the game
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    //each choice has a data-number set to it in the html
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


//score increment changes the score text in the html
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();