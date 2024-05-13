const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = "X";

let funcCalled = 0;

// add eventListeners to box
const box = document.getElementsByClassName("box");
const boxArray = Array.from(box);
boxArray.forEach((Element) => Element.addEventListener("click", drawSymbol));

// draw symbol
function drawSymbol(event) {
  const Element = event.target;
  Element.textContent = turn;
  Element.removeEventListener("click", drawSymbol);
  Element.classList.remove("hoverable");
  Element.classList.add("clicked");
  new Audio("./Audio/ting.mp3").play();
  const timeId = setInterval(() => {
    Element.classList.remove("clicked");
    clearInterval(timeId);
  }, 100);
  checkWin();
  changeTurn();
}

// change the turn
function changeTurn() {
  turn = turn == "X" ? "O" : "X";
}

// check who won
function checkWin() {
  funcCalled++;
  winConditions.forEach((e) => {
    if (
      box[e[0]].innerHTML == box[e[1]].innerHTML &&
      box[e[2]].innerHTML == box[e[1]].innerHTML &&
      box[e[0]].innerHTML != ""
    ) {
      if (turn == "X") {
        document.body.innerHTML = `<h1>PLAYER 1 WON!!!</h1> <button onClick="restart()">PLAY AGAIN</button>`;
        new Audio("./Audio/player1.mp3").play();
      } else {
        document.body.innerHTML = `<h1>PLAYER 2 WON!!!</h1> <button onClick="restart()">PLAY AGAIN</button>`;
        new Audio("./Audio/player2.mp3").play();
      }
    } else if (funcCalled == 9) {
      document.body.innerHTML = `<h1>DRAW</h1> <button onClick="restart()">PLAY AGAIN</button>`;
      new Audio("./Audio/bruh.mp3").play();
    }
  });
}

// restart
function restart() {
  window.location.reload();
}
