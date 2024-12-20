function board(mode) {
  const divs = document.querySelector(".boards");
  const container1 = document.createElement("div");
  const container2 = document.createElement("div");

  container1.className = "container";
  container2.className = "container";

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  p1.textContent = "Player 2 board:";
  p2.textContent = "Player 1 board:";

  const board1 = document.createElement("div");
  const board2 = document.createElement("div");
  board1.className = "board";
  board2.className = "board";
  container1.append(p1, board1);
  container2.append(p2, board2);
  newGame(divs);
  divs.append(container1, container2);
  const player1 = player();
  const player2 = player();
  player1.setPositions(selectRandomPosition());
  player2.setPositions(selectRandomPosition());
  player1.place();
  player2.place();
  player2.endTurn();
  Createboard(player1, document.querySelectorAll(".board")[0], "po");
  Createboard(player2, document.querySelectorAll(".board")[1], "pt");
  if (mode) {
    eventsTwoPLayer(
      player1,
      player2,
      document.querySelectorAll(".board")[0],
      document.querySelectorAll(".board")[1]
    );
  } else {
    eventsOnePLayer(
      player1,
      player2,
      document.querySelectorAll(".board")[0],
      document.querySelectorAll(".board")[1]
    );
  }
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
          board1.style.backgroundColor = "rgba(128, 128, 128, 0.589)";
          board2.style.backgroundColor = "rgba(255, 255, 255, 0.377)";
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
          board2.style.backgroundColor = "rgba(128, 128, 128, 0.589)";
          board1.style.backgroundColor = "rgba(255, 255, 255, 0.377)";
        }
        e.target.className = "destroyed";
      }
    }
  });
}
function eventsOnePLayer(player1, player2, board1, board2) {
  let attacking = "";
  board1.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      if (player1.getTurn()) {
        let x = e.target.id.charAt(2);
        let y = e.target.id.charAt(3);
        let ship = player1.getBoard().getBoard()[x][y];
        player1.endTurn();
        attacking = true;
        if (ship) {
          e.target.style.backgroundColor = "yellow";
          player1.getBoard().receiveAttack(x, y);
        } else {
          e.target.style.backgroundColor = "red";
        }
        if (player1.getBoard().allShipsSunks()) {
          board1.style.backgroundColor = "red";
          board2.style.backgroundColor = "blue";
          attacking = false;
        } else {
          board1.style.backgroundColor = "rgba(128, 128, 128, 0.589)";
          board2.style.backgroundColor = "rgba(255, 255, 255, 0.377)";
        }
        e.target.className = "destroyed";

        //cpu
        setTimeout(() => {
          while (attacking) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let ship = player2.getBoard().getBoard()[x][y];
            const cell = document.querySelector("#pt" + x + y);
            if (cell.className === "destroyed") {
            } else {
              if (ship) {
                player2.getBoard().receiveAttack(x, y);
                cell.style.backgroundColor = "yellow";
                cell.className = "destroyed";
                attacking = false;
              } else {
                cell.style.backgroundColor = "red";
                cell.className = "destroyed";
                attacking = false;
              }
              if (player2.getBoard().allShipsSunks()) {
                board2.style.backgroundColor = "red";
                board1.style.backgroundColor = "blue";
                attacking = false;
              } else {
                board2.style.backgroundColor = "grey";
                board1.style.backgroundColor = "rgba(255, 255, 255, 0.377)";
                player1.takeTurn();
              }
            }
          }
        }, 500);
      }
    }
  });
}
function selectRandomPosition() {
  let positions = [];
  positions.push([
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
  positions.push([
    [0, 4],
    [0, 7],
    [1, 3],
    [2, 9],
    [3, 4],
    [0, 1],
    [1, 0],
    [5, 3],
    [6, 3],
    [9, 0],
  ]);
  positions.push([
    [1, 4],
    [1, 7],
    [7, 3],
    [8, 9],
    [5, 5],
    [9, 1],
    [8, 0],
    [5, 0],
    [6, 5],
    [7, 5],
  ]);
  positions.push([
    [9, 4],
    [9, 7],
    [7, 3],
    [8, 9],
    [3, 4],
    [5, 1],
    [5, 5],
    [1, 3],
    [6, 3],
    [4, 0],
  ]);
  const randomNumber = Math.floor(Math.random() * 3);

  return positions[randomNumber];
}
function options() {
  const div = document.querySelector(".boards");
  div.replaceChildren();
  twoPlayer(div);
  onePlayer(div);
}
function twoPlayer(element) {
  const option = document.createElement("button");
  option.textContent = "vs player";
  option.className = "option";
  element.appendChild(option);
  option.addEventListener("click", () => {
    board(true);
    const buttons = document.querySelectorAll(".option");
    buttons.forEach((button) => button.remove());
  });
}
function onePlayer(element) {
  const option = document.createElement("button");
  option.textContent = "vs cpu";
  option.className = "option";
  element.appendChild(option);
  option.addEventListener("click", () => {
    board(false);
    const buttons = document.querySelectorAll(".option");
    buttons.forEach((button) => button.remove());
  });
}
function newGame(element) {
  const option = document.createElement("button");
  option.textContent = "new game";
  option.className = "newGame";
  element.appendChild(option);
  option.addEventListener("click", () => {
    options();
    option.remove();
  });
}
options();
import { player } from "./player.js";
