function board() {
  let divs = document.querySelectorAll(".board");
  const player1 = player();
  const player2 = player();
  player2.setPositions([
    [0, 6],
    [1, 7],
    [2, 3],
    [2, 9],
    [5, 4],
    [6, 6],
    [7, 2],
    [8, 3],
    [9, 5],
    [1, 0],
  ])
  player1.place();
  player2.place();
  Createboard(player1, divs[0]);
  Createboard(player2, divs[1]);
}
function placeShipInTheBoard(ships, x, y) {
  if (ships[x][y]) {
    return true;
  }
  return false;
}
function Createboard(player1, element) {
  let shipsPostision = player1.getBoard().getBoard();
  let x = 0;
  let y = 0;
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (y >= 10) {
      x++;
      y = 0;
    }
    if (placeShipInTheBoard(shipsPostision, x, y)) {
      console.log("hellooo");
      cell.style.backgroundColor = "green";
    }
    y++;
    element.appendChild(cell);
  }
}
function events(player1,player2,board1, board2) {
  
}
board();
import { player } from "./player.js";
