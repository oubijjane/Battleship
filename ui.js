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
  ]);
  player1.place();
  player2.place();
  player2.endTurn();
  Createboard(player1, divs[0], "po");
  Createboard(player2, divs[1], "pt");
  eventsTwoPLayer(player1, player2, divs[0], divs[1]);
}
function placeShipInTheBoard(ships, x, y) {
  if (ships[x][y]) {
    return true;
  }
  return false;
}
function Createboard(player1, element, id) {
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
    cell.id = id + x + y;
    if (placeShipInTheBoard(shipsPostision, x, y)) {
      //cell.style.backgroundColor = "green";
    }
    y++;
    element.appendChild(cell);
  }
}
function eventsTwoPLayer(player1, player2, board1, board2) {
  board1.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      if (player1.getTurn()) {
        let x = e.target.id.charAt(2);
        let y = e.target.id.charAt(3);
        let ship = player1.getBoard().getBoard()[x][y];
        console.log(ship);
        console.log(x);
        player1.endTurn();
        player2.takeTurn();

        if (ship) {
          e.target.style.backgroundColor = "yellow";
          player1.getBoard().receiveAttack(x, y);
        } else {
          e.target.style.backgroundColor = "red";
        }
        if (player1.getBoard().allShipsSunks()) {
          board1.style.backgroundColor = "red";
          board2.style.backgroundColor = "blue";
          player2.endTurn();
        } else {
          board1.style.backgroundColor = "grey";
          board2.style.backgroundColor = "white";
        }
        e.target.className = "destroyed";
      }
    }
  });

  board2.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      if (player2.getTurn()) {
        let x = e.target.id.charAt(2);
        let y = e.target.id.charAt(3);
        let ship = player2.getBoard().getBoard()[x][y];
        player2.endTurn();
        player1.takeTurn();
        if (ship) {
          e.target.style.backgroundColor = "yellow";
          player2.getBoard().receiveAttack(x, y);
        } else {
          e.target.style.backgroundColor = "red";
        }
        if (player2.getBoard().allShipsSunks()) {
          board2.style.backgroundColor = "red";
          board1.style.backgroundColor = "blue";
          player1.endTurn();
        } else {
          board2.style.backgroundColor = "grey";
          board1.style.backgroundColor = "white";
        }
        e.target.className = "destroyed";
      }
    }
  });
}
board();
import { player } from "./player.js";
