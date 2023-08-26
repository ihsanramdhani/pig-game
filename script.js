'use strict';

// initialize element into a variable
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const buttonNewGame = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const currPlayer0 = document.querySelector('#current--0');
const currPlayer1 = document.querySelector('#current--1');

// starting conditions
diceEl.classList.add('hidden');
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
currPlayer0.textContent = 0;
currPlayer1.textContent = 0;

// roll dice button
buttonRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6 + 1);
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  player0.classList.contains('player--active')
    ? (currPlayer0.textContent = Number(currPlayer0.textContent) + dice)
    : (currPlayer1.textContent = Number(currPlayer1.textContent) + dice);

  if (dice === 1) {
    player0.classList.contains('player--active')
      ? (currPlayer0.textContent = 0)
      : (currPlayer1.textContent = 0);

    // switch the player
    if (player0.classList.contains('player--active')) {
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else {
      player0.classList.add('player--active');
      player1.classList.remove('player--active');
    }
  }
});

// hold button
buttonHold.addEventListener('click', function () {
  player0.classList.contains('player--active')
    ? (scorePlayer0.textContent =
        Number(scorePlayer0.textContent) + Number(currPlayer0.textContent))
    : (scorePlayer1.textContent =
        Number(scorePlayer1.textContent) + Number(currPlayer1.textContent));

  player0.classList.contains('player--active')
    ? (currPlayer0.textContent = 0)
    : (currPlayer1.textContent = 0);

  // switch the player
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }

  // win condition
  if (Number(scorePlayer0.textContent) >= 100) {
    player0.classList.add('player--winner');
    buttonRoll.classList.add('hidden');
    buttonHold.classList.add('hidden');
  } else if (Number(scorePlayer1.textContent) >= 100) {
    player1.classList.add('player--winner');
    buttonRoll.classList.add('hidden');
    buttonHold.classList.add('hidden');
  }
});

// new game button
buttonNewGame.addEventListener('click', function () {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player0.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currPlayer0.textContent = 0;
  currPlayer1.textContent = 0;
  buttonRoll.disabled = false;
  buttonHold.disabled = false;
});
