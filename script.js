const questions = [
  {
    title: 'Which planet is the Solar System is the smallist?',
    options: [
      {
        title: 'Pluto',
        isCorrect: false,
      },
      {
        title: 'Earth',
        isCorrect: false,
      },
      {
        title: 'Mercury',
        isCorrect: true,
      },
      {
        title: 'Mars',
        isCorrect: false,
      },
    ],
  },
  {
    title: 'What is the capital of Japan?',
    options: [
      {
        title: 'Tokyo',
        isCorrect: true,
      },
      {
        title: 'Seoul',
        isCorrect: false,
      },
      {
        title: 'Bangkok',
        isCorrect: false,
      },
      {
        title: 'Pekin',
        isCorrect: false,
      },
    ],
  },
  {
    title: 'Which element has the chemical symbol-O ?',
    options: [
      {
        title: 'Oxygen',
        isCorrect: true,
      },
      {
        title: 'Gold',
        isCorrect: false,
      },
      {
        title: 'Osmium',
        isCorrect: false,
      },
      {
        title: 'Potassium',
        isCorrect: false,
      },
    ],
  },
  {
    title: 'Which ocean is the largest by surface area?',
    options: [
      {
        title: 'Atlantic Ocean',
        isCorrect: false,
      },
      {
        title: 'Pacific Ocean',
        isCorrect: true,
      },
      {
        title: 'Indian Ocean',
        isCorrect: false,
      },
      {
        title: 'Arctic Ocean',
        isCorrect: false,
      },
    ],
  },
  {
    title: 'Who wrote the play "Romeo and Juliet"?',
    options: [
      {
        title: 'Jane Austen',
        isCorrect: false,
      },
      {
        title: 'Mark Twain',
        isCorrect: false,
      },
      {
        title: 'Charles Dickens',
        isCorrect: false,
      },
      {
        title: 'William Shakespeare',
        isCorrect: true,
      },
    ],
  },
];
const quizLogo = document.querySelector('.logo');
const startButton = document.querySelector('.start-button');
const progressBarView = document.querySelector('.progress');
let progressBar = document.querySelector('.progress-bar');
const countBarView = document.querySelector('.count');
let countBar = document.querySelector('.count-bar');
const question = document.querySelector('.question');
const options = document.querySelector('.options');
const next = document.querySelector('.next-button');
const crown = document.querySelector('.crown-image');
const score = document.querySelector('.score');
const restartDiv = document.querySelector('.restart');
restartDiv.style.display = 'none';
const restartButton = document.querySelector('.restart-button');
restartButton.style.display = 'none';
let result = 0;
let currentQuestionIndex = 0;
let isAnswered = false;

const updateProgressBar = (progress) => {
  progressBar.style.width = `${(100 * progress) / questions.length}%`;
};
const updateCountBar = (count) => {
  countBar.style.width = `${(100 * count) / questions.length}%`;
};
function buttonClick(event, isCorrect, correctOptionIndex) {
  if (!isAnswered) {
    const clickedButton = event.target;
    // options.button.hover.background = ' rgb(215, 170, 158)';
    if (isCorrect) {
      clickedButton.style.background = 'rgb(50, 215, 50)';
      result += 1;
    } else {
      clickedButton.style.background = 'rgb(240, 30, 30)';
      options.childNodes[correctOptionIndex].style.background = 'green';
    }

    updateCountBar(currentQuestionIndex + 1);
    updateProgressBar(result);
    isAnswered = true;
    if (currentQuestionIndex + 1 === questions.length) {
      next.style.display = 'none';
      setTimeout(() => {
        question.style.display = 'none';
      }, 2000);

      //end
      setTimeout(() => {
        question.style.display = 'none';
        progressBar.style.display = 'none';
        countBar.style.display = 'none';
        countBarView.style.display = 'none';
        progressBarView.style.display = 'none';
        // crown.style.display = 'block';
        score.style.display = 'flex';

        const scoreP = document.createElement('p');
        scoreP.classList.add('score-text');
        const scoreText = document.createTextNode(
          `Congratulations you scored ${result} points! 🎉`,
        );
        scoreP.appendChild(scoreText);
        score.appendChild(scoreP);
        restartDiv.style.display = 'flex';
        restartButton.style.display = 'block';
      }, 1500);
      restartButton.addEventListener('click', () => {
        location.reload();
      });
    } else {
      next.style.display = 'block';
    }
  }
}

const displayQuestion = (currentQuestion) => {
  next.style.display = 'none';
  const questionText = document.querySelector('.question-p');
  questionText.innerHTML = currentQuestion.title;

  //Render Options
  options.innerHTML = '';
  const correctOptionIndex = currentQuestion.options.findIndex((option) => option.isCorrect);
  currentQuestion.options.forEach((option) => {
    const button = document.createElement('button');
    button.classList.add('option');
    const text = document.createTextNode(option.title);
    button.appendChild(text);
    button.addEventListener('click', (event) =>
      buttonClick(event, option.isCorrect, correctOptionIndex),
    );
    options.appendChild(button);
  });
};

startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  quizLogo.style.display = 'none';
  question.style.display = 'flex';
  progressBarView.style.display = 'block';
  countBarView.style.display = 'block';
  displayQuestion(questions[currentQuestionIndex]);
});
next.addEventListener('click', () => {
  // currentQuestionIndex += 1;
  isAnswered = false;
  displayQuestion(questions[++currentQuestionIndex]);
});
// document.addEventListener('keydown', (e) => {
//   if (e.code === 'Enter') {
//     isAnswered = false;
//     displayQuestion(questions[++currentQuestionIndex]);
//   }
// });
