const controlGameOver = document.querySelector(".control-game-over");
const sky = document.querySelector(".sky");
const sunOrMoon = document.querySelector(".sun-or-moon");
const clouds = document.querySelector(".clouds");
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const score = document.querySelector(".score");
const scoreResult = document.querySelector("#score-result");
const initialMarkScore = 150;

let finished = false;
let totalScore = 0;
let markScore = initialMarkScore;
let scenario = "day";

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
    if (!finished) {
      incrementScore();
    }
  }, 500);
};

const incrementScore = () => {
  totalScore += 10;
  score.innerHTML = `Score: ${totalScore}`;
};

const changeMarkScore = () => {
  markScore += initialMarkScore;
};

const toDay = () => {
  removeMoon();
  setTimeout(() => {
    sky.classList.remove("sky-night");
    clouds.classList.remove("clouds-night");
    sky.classList.add("sky");
    clouds.classList.add("clouds");
  }, 2000);
};

const toNight = () => {
  removeSun();
  setTimeout(() => {
    sky.classList.remove("sky");
    clouds.classList.remove("clouds");
    sky.classList.add("sky-night");
    clouds.classList.add("clouds-night");
  }, 2000);
};

const removeSun = () => {
  sunOrMoon.classList.add("sun-remove");
  setTimeout(() => {
    sunOrMoon.classList.remove("sun");
    sunOrMoon.classList.remove("sun-remove");
    sunOrMoon.classList.add("moon");
  }, 2000);
};

const removeMoon = () => {
  sunOrMoon.classList.add("moon-remove");
  setTimeout(() => {
    sunOrMoon.classList.remove("moon");
    sunOrMoon.classList.remove("moon-remove");
    sunOrMoon.classList.add("sun");
  }, 2000);
};

changeScenario = () => {
  if (markScore % initialMarkScore === 0) {
    scenario = scenario === "day" ? "night" : "day";

    if (scenario === "day") {
      toDay();
    } else {
      toNight();
    }
  }
  changeMarkScore();
};

toDay();

const gameLoop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;

  // (+) converte string para number
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
    pipe.style.left = `${pipePosition}px`;
    pipe.style.animation = "none";

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    finished = true;

    this.clearInterval();

    controlGameOver.classList.add("game-over-board");
    score.style.display = "none";
    scoreResult.innerHTML = `Total Score: ${totalScore}`;
  }

  const actualScoreIsHigherThanMark = totalScore >= markScore;

  if (actualScoreIsHigherThanMark) {
    changeScenario();
  }
}, 10);

document.addEventListener("keydown", jump);
