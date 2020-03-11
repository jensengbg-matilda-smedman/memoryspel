const cards = document.querySelectorAll('.memory-card');
let counter = document.getElementById('counter');
let moves = 0;
let hasFlippedCard = false;
let lockBoard = false
let firstCard, secondCard;
let countMatches = [];

/* Flipping and matching */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() { 
  moves++;
  counter.innerHTML = 'Moves: ' + moves;

  let isMatch = firstCard.dataset.game === secondCard.dataset.game;
  isMatch ? disableCards() : unflipCards();
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    
    /* Show "win" message */
    countMatches++;
    console.log(countMatches);
    if (countMatches === 8) {
      restartGame();
    }
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
}

/* Always shuffle deck */
(function shuffleCards() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}());


/* Try again button */
document.getElementById('restartButton').addEventListener('click', restartGame);

function restartGame(){
  let winning = document.getElementById('win'); //The article with the winning
  winning.classList.toggle('hide'); //toggle the hide class
  countMatches = 0;
  cards.forEach(card => card.addEventListener('click', flipCard)); //make so we can click on the cards again. 
  resetCards();
  function resetCards() {
    moves = 0;
    counter.innerHTML = 'Moves: ' + moves;
    for (i = 0; i < cards.length; i++) {
      cards[i].classList.remove('flip');
    }
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));