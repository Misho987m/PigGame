'use strict';

const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const diceElement = document.querySelector('.dice');
const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

let currentScore, scores, playing, player;

function init() {
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  player = 0;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
}
init();

function changePlayer() {
  currentScore = 0;
  document.getElementById(`current--${player}`).textContent = currentScore;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
  player = player === 0 ? 1 : 0;
}

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${player}`).textContent = currentScore;
    } else {
      changePlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[player] += currentScore;
    document.getElementById(`score--${player}`).textContent = scores[player];
    if (scores[player] >= 100) {
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--active');
      diceElement.classList.add('hidden');
      playing = false;
    } else {
      changePlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
