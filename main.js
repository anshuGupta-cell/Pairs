import Controller from './controller.js';

const selectCellsNo = document.querySelector('.select-cells-no')

const game = new Controller(selectCellsNo.value);
const timerCont = '<span>00</span>min <span>00</span>sec'

let prevGame

selectCellsNo.addEventListener('change',(e)=>{
  document.querySelector('.play-ground').innerHTML = '';
  
  game.stopTimer();
  prevGame && prevGame.stopTimer()
  prevGame && (prevGame.innerHTML = timerCont)
  const newGame = new Controller(e.target.value)
  prevGame = newGame;
  
})