const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Initial moves and win count
let movesCount = 6;

  const time = document.getElementById('time');
  time.innerHTML=`<span>Try's Remaining:</span>${movesCount}`;

  //For calculating moves
const movesCounter = () => {
    console.log(movesCount);
    if(movesCount==1){
        time.innerHTML=`<span>Try Again:</span>`;
        resetBoard();
      }
    movesCount -= 1;
    time.innerHTML = `<span>Try's Remaining:</span>${movesCount}`;
  };

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    
    movesCounter();
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  var wincount=0;
  wincount+=1;
    console.log(wincount);
  if (wincount == 5) {
     time.innerHTML = `<span>You Won</span>`;
  }

  resetBoard();
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

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));