const winConditions = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [1, 2, 3],
  [2, 5, 6],
  [1, 2, 3],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [1, 4, 7],
  [1, 5, 9],
  [3, 5, 7],
  [4, 5, 6],
  [2, 5, 8],
  [3, 6, 9],
  [4, 5, 6],
  [1, 4, 7],
  [7, 8, 9],
  [3, 5, 7],
  [2, 5, 8],
  [7, 8, 9],
  [3, 6, 9],
  [7, 8, 9],
  [1, 5, 9],
];

// audios
const plyerOneWins = new Audio();
const plyer2Wins = new Audio();
const bruh = new Audio();
plyerOneWins.src = "../Audio/player1.mp3";
plyer2Wins.src = "../Audio/player2.mp3";
bruh.src = "../Audio/Bruh sound effect (320).mp3";

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
    document.body.innerHTML = "<h1>DRAW!!</h1>";
    bruh.play();
  } else if (isPlayer1Playing && player1Positions.length >= 3) {
    result(player1Positions);
    console.log(player1Positions);
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
      document.body.innerHTML = "<h1>PLAYER 1 WON !!</h1>";
      plyerOneWins.play();
    } else if (trueCount.length == 3) {
      document.body.innerHTML = "<h1>PLAYER 2 WON !!</h1>";
      plyer2Wins.play();
    }
  });
}

// animate
function animateBox(element) {
  element.classList.add("clicked");
  setInterval(() => {
    element.classList.remove("clicked");
  }, 400);

   if (isPlayer1Playing) {
     element.classList.add("player1");
   } else {
     element.classList.add("player2");
   }

  
 
}
