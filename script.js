"use strict";

const score0el = document.getElementById("score--0");
const score1el = document.getElementById("score--1");
const current0el = document.getElementById("current--0");
const current1el = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0el.textContent = 0;
  score1el.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;

  diceEl.classList.add("hidden");

  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
};

const switchPlayer = function () {
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
};

init();

btnRoll.addEventListener("click", function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove("hidden");
  diceEl.src = `img/dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add("hidden");

    document.querySelector(`.player--${activePlayer}`).classList.add("winner");
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
