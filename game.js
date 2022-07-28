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

let questions = [{
          question: "Are you coming to ____party next Saturday ? ",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 3
      },
      {
          question: "I bought_____new TVset yesterday.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 1
      },
      {
          question: "I think____man over there is very ill.He can 't stand on his feet.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 3
      },
      {
          question: "____ man is mortal.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 4
      },
      {
          question: "I am ____university student.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 1
      },
      {
          question: "Kiran is ____best student in the class.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 3
      },
      {
          question: "____ camel is the ship of the desert.     ",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 3
      },
      {
          question: "Harishchandra was ____honest king. ",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 2
      },
      {
          question: "I want ____ apple from that basket.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 2
      },
      {
          question: "I bought ____umbrella to go out in the rain.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 2
      },
      {
          question: "__ church on the corner is progressive.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 3
      },
      {
          question: "Miss Lin speaks____Chinese.",
          choice1: "A ",
          choice2: "AN ",
          choice3: "THE ",
          choice4: "None of the above ",
          answer: 4
      }
  ]
  

//CONSTANTS
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
