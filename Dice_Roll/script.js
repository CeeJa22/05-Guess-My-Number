'use strict';

const resetBtn = document.querySelector('.btn--new');
const players = document.querySelectorAll('.player');
const allPotentialPlayersScore = document.querySelectorAll('.current-score');
const rollBtn = document.querySelector('.btn--roll');
const diceEmoji = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn--hold');
let actualPlayerScore = document.querySelectorAll('.score');
let score0 = 0;
let score1 = 0;
let currentPotentialScore = 0;
let activePlayer = 0;
diceEmoji.classList.add('hidden');

function gameReset() {
  for (let i = 0; i < actualPlayerScore.length; i++) {
    actualPlayerScore[i].textContent = '0';
    allPotentialPlayersScore[i].textContent = '0';
    players[i].classList.remove('winner-background');
  }
  players[0].classList.add('player--active');
  players[1].classList.remove('player--active');
  document.getElementById('name--0').textContent = 'PLAYER 1';
  document.getElementById('name--1').textContent = 'PLAYER 2';
  score0 = 0;
  score1 = 0;
  activePlayer = 0;
  currentPotentialScore = 0;
}

function scoreReset() {
  if (activePlayer === 0) {
    score0 = 0;
  } else {
    score1 = 0;
  }
}

function changePlayer() {
  players[activePlayer].classList.remove('player--active');
  allPotentialPlayersScore[activePlayer].textContent = 0;
  currentPotentialScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  players[activePlayer].classList.add('player--active');
  currentPotentialScore = 0;
}

resetBtn.addEventListener('click', gameReset);

rollBtn.addEventListener('click', function () {
  let rolledNumber = Math.ceil(Math.random() * 6);
  diceEmoji.classList.remove('hidden');
  diceEmoji.src = `dice-${rolledNumber}.png`;

  if (rolledNumber === 1) {
    actualPlayerScore[activePlayer].textContent = 0;
    scoreReset();
    changePlayer();
  } else {
    currentPotentialScore += rolledNumber;
    console.log(currentPotentialScore);
    document.getElementById(`current--${activePlayer}`).textContent =
      currentPotentialScore;
  }
});

holdBtn.addEventListener('click', function () {
  if (activePlayer === 0) {
    score0 += currentPotentialScore;
    if (score0 >= 20) {
      actualPlayerScore[activePlayer].textContent = score0;
      document.querySelector('#name--0').textContent = 'WINNER';
      document.querySelector('.player--0').classList.add('winner-background');
      setTimeout(gameReset, 10000);
    } else {
      actualPlayerScore[activePlayer].textContent = score0;
      changePlayer();
    }
  } else if (activePlayer === 1) {
    score1 += currentPotentialScore;
    if (score1 >= 20) {
      actualPlayerScore[activePlayer].textContent = score1;
      document.querySelector('#name--1').textContent = 'WINNER';
      document.querySelector('.player--1').classList.add('winner-background');
      setTimeout(gameReset, 10000);
    } else {
      actualPlayerScore[activePlayer].textContent = score1;
      changePlayer();
    }
  }
});
