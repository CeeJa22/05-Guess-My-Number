'use strict';

const button = document.querySelector('.check');
const playAgain = document.querySelector('.again');
const bodyBackground = document.querySelector('body');
const highscoreDisplayed = document.querySelector('.highscore');
let randomNumber = Math.trunc(Math.random() * 21);
let score = 20;

function reset() {
  button.disabled = false;
  document.querySelector('.number').textContent = '?';
  randomNumber = Math.trunc(Math.random() * 21);
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = 0;
  document.querySelector('.message').textContent = 'Start guessing...';
  bodyBackground.style.backgroundColor = '#222';
  playAgain.classList.remove('again__movement');
  playAgain.classList.add('again');
}

playAgain.addEventListener('click', reset);

button.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'Guess a Number!';
  } else if (guess === randomNumber) {
    document.querySelector('.message').textContent =
      'Correct! You Win, click Again to Play again.';
    bodyBackground.style.backgroundColor = 'green';
    playAgain.classList.add('again__movement');
    playAgain.classList.remove('again');
    document.querySelector('.number').textContent = randomNumber;
    button.disabled = true;
    highscoreDisplayed.textContent = score;
  } else if (guess != randomNumber) {
    score--;
    if (score > 0) {
      document.querySelector('.message').textContent =
        guess > randomNumber
          ? 'Too high, guess again.'
          : 'Too low, guess again.';
      document.querySelector('.score').textContent = score;
    } else if (score === 0) {
      document.querySelector('.score').textContent = score;
      document.querySelector('.message').textContent =
        'Play again, score reached zero.';
      setTimeout(function () {
        reset();
      }, 10000);
    }
  }
});
