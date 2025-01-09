class Elements {
  constructor(cardsNo) {
    this.playGround = document.querySelector('.play-ground');
    this.cardsNo = cardsNo;
    this.cardsIndex = [];
    this.doubleIndex();
    this.createCards();
    this.modal = document.querySelector('.modal');
    this.newGameBtn = document.querySelector('.new-game');
    this.wrongAttempts = document.querySelector('.wAtt');
    this.cards = document.querySelectorAll('.card');
    this.modalTimer = document.querySelector('.timer');
    this.modalTime = document.querySelector('.modal-time');
    this.resetBtn = document.querySelector('.reset');
    this.resetModal = document.querySelector('.reset-modal')
    this.attempts = {
      correct: 0,
      wrong: 0,
      click: 0
    }
    this.resetGame();
  }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  doubleIndex() {
    for (let i = 1; i <= this.cardsNo; i++) {
      (i <= this.cardsNo / 2) ? this.cardsIndex.push(i): this.cardsIndex.push(i - this.cardsNo / 2)
    }
    console.log(this.cardsIndex)
  }

  createCards() {
    this.playGround.style.gridTemplateRows = `repeat(${Math.sqrt(this.cardsNo)}, 1fr)`;
    this.playGround.style.gridTemplateColumns = `repeat(${Math.sqrt(this.cardsNo)}, 1fr)`;

    this.shuffle(this.cardsIndex).forEach((i) => {
      const card = document.createElement('div');
      const img = document.createElement('img');
      card.classList.add('card');
      card.setAttribute('data-index', i);
      img.src = `img/${i}.jpeg`;

      card.append(img);
      this.playGround.append(card)
    })

  }

  resetGame() {
    console.log(this.resetBtn)
    this.resetBtn.onclick = () => {
      this.resetModal.style.visibility = 'visible'
      this.resetModal.style.opacity = '1'
      this.resetModal.querySelector('.cancel').onclick = () => {
        this.resetModal.style.visibility = 'hidden';
        this.resetModal.style.opacity = '0';
        
      }
      this.resetModal.querySelector('.yes').onclick = () => {
        location.reload()
      }
    }
  }

}

export default Elements;