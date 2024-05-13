const winConditions = [
  [2, 5, 6],
  [1, 2, 3],
  [4, 5, 6],
  [1, 4, 7],
  [7, 8, 9],
  [3, 5, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
];

// audios
const plyerOneWins = new Audio("./Audio/player1.mp3");
const plyer2Wins = new Audio("./Audio/player2.mp3");
const bruh = new Audio("./Audio/Bruh sound effect (320).mp3");

// position of playe1 and player2 which they clicked
let player1Positions = [],
  player2Positions = [];

// to check isPlayer1 playing
let isPlayer1Playing = true;

// Get all the div with box class
const btn = document.getElementsByClassName("box");

// set eventListener for all the boxes
for (let index = 0; index < btn.length; index++) {
  btn[index].addEventListener("click", putSymbol);
}

function putSymbol(e) {
  // get the id of clicked div box
  const id = e.target.id;

  // get the element that was clicked
  const boxClicked = document.getElementById(id);
  animateBox(boxClicked);

  //play sound
  new Audio("./Audio/ting.mp3").play();

  // variable to store symbol X or O
  let symbol;

  if (isPlayer1Playing) {
    (symbol = "X"), (player1Positions = [...player1Positions, id]);
  } else {
    (symbol = "O"), (player2Positions = [...player2Positions, id]);
  }

  boxClicked.innerHTML = symbol;
  boxClicked.removeEventListener("click", putSymbol);

  if (player1Positions.length == 5 && player2Positions.length == 4) {
    document.body.innerHTML =
      "<h1>DRAW!!</h1> <button onClick='restart()'>PLAY AGAIN</button>";
    bruh.play();
  } else if (isPlayer1Playing && player1Positions.length >= 3) {
    result(player1Positions);
  } else if (player2Positions.length >= 3) {
    result(player2Positions);
  }

  isPlayer1Playing = !isPlayer1Playing;
}

// check who won
function result(playerPositions) {
  winConditions.map((Array) => {
    const boolean = Array.map((element) => {
      return playerPositions.includes(`${element}`);
    });

    const trueCount = boolean.filter((element) => element == true);
    if (isPlayer1Playing && trueCount.length == 3) {
      document.body.innerHTML =
        "<h1>PLAYER 1 WON !!</h1><button onClick='restart()'>PLAY AGAIN</button>";
      plyerOneWins.play();
    } else if (trueCount.length == 3) {
      document.body.innerHTML =
        "<h1>PLAYER 2 WON !!</h1> <button onClick='restart()'>PLAY AGAIN</button>";
      plyer2Wins.play();
    }
  });
}

// animate
function animateBox(element) {
  element.classList.add("clicked");
  element.classList.remove("hoverable");
  let timeInterval = setInterval(() => {
    element.classList.remove("clicked");
    // element.classList.add(isPlayer1Playing ? "player1" : "player2");
    clearInterval(timeInterval);
  }, 100);
}

// reload game.html
function restart() {
  window.location.reload();
}
