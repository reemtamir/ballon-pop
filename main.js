'use strict';
var pop = new Audio('balloon.mp3');

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(10) + 10;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}
var Interval;
var count = 0;
function createBalloons(num) {
  var balloonContainer = document.getElementById('balloon-container');
  for (let i = num; i > 0; i--) {
    var balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.id = i;

    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
    if (i % 3 === 0) {
      balloon.innerHTML = '🎯';
    }

    balloon.addEventListener('click', function balloonPop(event, id) {
      var balloon = document.querySelector('.balloon');
      document.getElementById(i).classList.add('hide');
      if (i % 3 === 0) count++;
      pop.play();
      pop.currentTime = 0;
      if (count === 5) {
        alert('game');
        count = 0;
        clearInterval(Interval);
      }
    });
  }

  //   setTimeout(() => {
  //     if (count <= 4) alert('game over');
  //   }, 20000);
}

function timer() {
  var seconds = 0;
  var tens = 0;
  var appendTens = document.getElementById('tens');
  var appendSeconds = document.getElementById('seconds');

  clearInterval(Interval);
  Interval = setInterval(startTimer, 1000);
  function startTimer() {
    tens++;

    if (tens <= 9) {
      appendTens.innerHTML = '0' + tens;
    }

    if (tens > 9) {
      appendTens.innerHTML = tens;
    }

    if (tens > 99) {
      console.log('seconds');
      seconds++;
      appendSeconds.innerHTML = '0' + seconds;
      tens = 0;
      appendTens.innerHTML = '0' + 0;
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }
  }
}
