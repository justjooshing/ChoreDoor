//Setup

const playerScoreBoard = document.getElementById("playerScoreBoard");
let playerScore = 0;
const botScoreBoard = document.getElementById("botScoreBoard");
let botScore = 0;

const doorImage1 = document.getElementById("door1");
const doorImage2 = document.getElementById("door2");
const doorImage3 = document.getElementById("door3");

const closedDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

const botDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";

const beachDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";

const spaceDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

const doorsArray = [botDoorPath, beachDoorPath, spaceDoorPath];
const allDoors = document.querySelectorAll(".door-frame");
const startButton = document.getElementById("start");

const FisherYates = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const startRound = () => {
  FisherYates(doorsArray);
  allDoors.forEach((door) => (door.src = closedDoorPath));
  numClosedDoors = 3;
  startButton.innerHTML = "Good Luck";
  currentlyPlaying = true;
};

const isBot = (door) => door.src === botDoorPath;
const isClicked = (door) => door.src !== closedDoorPath;

startRound();

//Ready to play

allDoors.forEach((door) => {
  door.addEventListener("click", (event) => {
    const doorSelected = event.target;
    if (!isClicked(doorSelected) && currentlyPlaying) {
      doorSelected.src = doorsArray[event.target.dataset.door];
      playDoor(doorSelected);
    }
  });
});

const playDoor = (doorSelected) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(doorSelected)) {
    gameOver();
  }
};

//Endgame
const gameOver = (status) => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    playerScore++;
    playerScoreBoard.innerHTML = playerScore;
  } else {
    startButton.innerHTML = "Game over man, game over.";
    botScore++;
    botScoreBoard.innerHTML = botScore;
  }
  currentlyPlaying = false;
};

startButton.addEventListener("click", () => {
  if (!currentlyPlaying) {
    startRound();
  }
});
