const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const playAgainButton = document.getElementById("play-again");
const resetScore = document.getElementById("reset-button");
const scoreDisplay = document.querySelector("#score-display");
const startCells = ["", "", "", "", "", "", "", "", ""];

let numOfCircleWins = parseInt(localStorage.getItem("circleWins")) || 0;
let numOfCrossWins = parseInt(localStorage.getItem("crossWins")) || 0;

let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "It is now " + go + "'s go.";
  e.target.removeEventListener("click", addGo);
  checkScore();
  resetOnDraw();
}
function resetOnDraw() {
  numOfMoves++;
  if (numOfMoves === 9) {
    finished = true;
    numOfMoves = 0;
    countDown();
  }
}

let finished = false;
// let numOfCircleWins = 0;
// let numOfCrossWins = 0;
let numOfMoves = 0;

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle WINS";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      localStorage.setItem("circleWins", numOfCircleWins);
      updateScoreDisplay();
      finished = true;
      numOfCircleWins++;
      return;
    }
  });
  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross WINS";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      localStorage.setItem("crossWins", numOfCrossWins);
      updateScoreDisplay();
      finished = true;
      numOfCrossWins++;
      return;
    }
    countDown();
  });
}

function countDown() {
  if (finished) {
    setTimeout(playAgain, 5000);

    let countdownSeconds = 4;
    countdownInterval = setInterval(() => {
      infoDisplay.textContent = `New game in ${countdownSeconds} seconds`;
      countdownSeconds--;
      if (countdownSeconds < 0) {
        clearInterval(countdownInterval); // Clear the interval when countdown is done
        infoDisplay.textContent = "Circle goes first"; // Clear the countdown message
      }
    }, 1000);
    finished = false;
  }
}

playAgainButton.addEventListener("click", playAgain);
resetScore.addEventListener("click", scoreReset);

function playAgain() {
  // Clear the game board
  gameBoard.innerHTML = "";

  // Reset player turn and info display
  go = "circle";
  infoDisplay.textContent = "Circle goes first";

  // Recreate the game board
  createBoard();
  scoreDisplay.textContent = `CIRCLE WINS: ${numOfCircleWins}\t\tCROSS WINS: ${numOfCrossWins}`;
  localStorage.setItem("circleWins", numOfCircleWins);
  localStorage.setItem("crossWins", numOfCrossWins);
  updateScoreDisplay();
}

function updateScoreDisplay() {
  scoreDisplay.textContent = `CIRCLE WINS: ${numOfCircleWins}\t\tCROSS WINS: ${numOfCrossWins}`;
}
function resetNums() {
  numOfCircleWins = 0;
  numOfCrossWins = 0;
}
function scoreReset() {
  resetNums();
  updateScoreDisplay();
}
