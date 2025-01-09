import Elements from './Elements.js';

class Controller {
  constructor(cardsNo) {
    this.elements = new Elements(cardsNo);
    this.prevCard;
    this.clickCard();
    this.isRunning = true;
  }
  clickCard() {
    const { attempts, cards } = this.elements;
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        this.isRunning && this.startTimer()
        card.classList.add('change');
        attempts.click++;
        if (attempts.click === 2) {
          cards.forEach(card => {
            card.classList.add('pause')
            setTimeout(() => {
              card.classList.remove('pause')
            }, 1000)
          })

          attempts.click = 0;
          if (this.prevCard.dataset.index === card.dataset.index) {
            attempts.correct++;
            card.classList.add('stop');
            this.prevCard.classList.add('stop');
          } else {
            attempts.wrong++;
            setTimeout(() => {
              card.classList.remove('change');
              this.prevCard.classList.remove('change');
            }, 1000)
          }
          this.endGame();
        } else {
          this.prevCard = card;
        }
        this.isRunning = false;
      })
    })

  }

  endGame() {
    const {
      attempts,
      cardsNo,
      modal,
      newGameBtn,
      wrongAttempts,
      modalTime,
      modalTimer
    } = this.elements
    
    if (attempts.correct === cardsNo / 2) {
      this.isRunning = true;
      this.stopTimer()
      modalTime.innerHTML = modalTimer;
      console.log('you win')
      modal.style.cssText = 'visibility: visible; opacity: 1;';
      modalTime.innerHTML = modalTimer.innerHTML
      wrongAttempts.textContent = attempts.wrong;
      newGameBtn.onclick = () => {
        location.reload();
      }
    } else {
      console.log('not yet')
    }

  }

  startTimer() {
    const {modalTimer} = this.elements;
      const nowDate = Date.now();
      this.interval = setInterval(() => {
        const date = Date.now() - nowDate;
        const sec = Math.floor((date / 1000) % 60).toString().padStart(2, '0');
        const min = Math.floor((date / (1000 * 60)) % 60).toString().padStart(2, '0');
        //const hr = Math.floor(date / (1000 * 60 * 60)).toString().padStart(2, '0');
        modalTimer.innerHTML = `<span>${min}</span>min <span>${sec}</span>sec`
      }, 100)
    
  }
  
  stopTimer(){
    clearInterval(this.interval);
  }


}

export default Controller;