'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const playerName0 = document.getElementById('name--0')
const playerName1 = document.getElementById('name--1')

const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

let diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let scores, activePlayer, currentScore, playing;

const init = function () {
  currentScore = 0;
  score0El.textContent = 0
  score1El.textContent = 0
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0
  current1El.textContent = 0

  // we don't know which player is the winner. its better to remove both of them
  player0.classList.remove('player--winner')
  player1.classList.remove('player--winner')

  // we want player to start first
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  diceEl.classList.add('hidden')
}

init();

function switchPlayer() {
  // switch player
  // before switch, set the current player's core to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // toggle background color for active player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', ()=>{
  
   if (playing) {
     // 1. generate random dice roll
     const dice = Math.trunc(Math.random() * 6 + 1);
     // 2. display dice
     diceEl.classList.remove('hidden');
     diceEl.src = `dice-${dice}.png`;

     if (dice !== 1) {
       // add dice to current score
       currentScore += dice;
       document.getElementById(
         `current--${activePlayer}`
       ).textContent = currentScore;
     } else {
       switchPlayer();
     }
   }
})

btnHold.addEventListener('click', ()=>{
  // 1. add current score to active player's score
  if(playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if score >=100
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
})

btnNew.addEventListener('click', init);