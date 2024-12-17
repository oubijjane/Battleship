function Gameboard() {
  let ship = Ship();
  const board = Array(10)
    .fill(null)
    .map(() => new Array(10).fill(null));
  let usedRow = [];
  let usedColumn = [];

  const placeShip = (ship, x, y) => {
    checkIfempty(x, y);
    board[x][y] = ship;
    return board;
  };

  const checkIfempty = (x, y) => {
    if (usedColumn.includes(y)) {
      throw new Error("column already used");
    }
    if (usedRow.includes(x)) {
      throw new Error("row already used");
    }
    usedRow.push(x);
    usedColumn.push(y);
  };

  const receiveAttack = (ship, x,y) => {
    return board[x][y].hit();
  }

  return { placeShip, receiveAttack };
}

export { Gameboard };
import { Ship } from "./ship.js";
