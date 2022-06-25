'use strict';
var pop = new Audio('balloon.mp3');
var counter = document.querySelector('.counter');
function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(6) + 6;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}
var h1 = document.querySelector('.header');
var main = document.querySelector('.main');
var balloonContainer = document.getElementById('balloon-container');
var Interval;
var count = 0;
function createBalloons(num) {
  counter.innerHTML = '';
  h1.classList.remove('hide');
  main.classList.remove('end-game');
  balloonContainer.style.display = 'block';
  for (let i = num; i > 0; i--) {
    var balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.id = i;
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
    if (i % 4 === 0) {
      balloon.innerHTML = '🎯';
    }

    balloon.addEventListener('click', function balloonPop() {
      document.getElementById(i).classList.add('hide');
      if (i % 4 === 0) count++;
      counter.innerHTML = count;
      pop.play();
      pop.currentTime = 0;
      if (count === 3) {
        appendTens.innerHTML = ' WIN';
        balloonContainer.style.display = 'none';
        clearInterval(Interval);
        main.classList.add('end-game');
        h1.classList.add('hide');
      }
    });
  }
}
var tens = 15;
var appendTens = document.getElementById('tens');

function timer() {
  tens = 15;
  count = 0;
  clearInterval(Interval);
  Interval = setInterval(startTimer, 1000);
  startTimer();
}
function startTimer() {
  tens--;
  appendTens.innerHTML = +tens;
  if (tens === 0) {
    appendTens.innerHTML = 'GAME OVER';
    count = 0;
    clearInterval(Interval);
    balloonContainer.style.display = 'none';
    main.classList.add('end-game');
    h1.classList.add('hide');
  }
}
