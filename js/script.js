const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard , secondCard;
  let counter = 12;
    counterupdate();



    function unflipCards() {
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

      
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    counterupdate();


    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  


  function counterupdate(){
    if(counter <= 0){
        alert('Better Luck Next Time');
        location.reload();
        
        document.getElementById('remainCo').innerHTML = `Try Remaining: ` + Math.ceil(counter/2);
      }
      else{
        
      document.getElementById('remainCo').innerHTML = `Try Remaining: ` + Math.ceil(counter/2);
      counter--;
      }
  }

 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

  cards.forEach(card => card.addEventListener('click', flipCard));