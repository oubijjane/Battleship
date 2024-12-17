function Gameboard() {
  let ship = Ship();
  const board = Array(10)
    .fill(null)
    .map(() => new Array(10).fill(null));
  let usedRow = [];
  let usedColumn = [];

  const placeShip = (ship, x, y) => {
    if (usedColumn.includes(y)) {
      throw new Error("column already used");
    }
    if (usedRow.includes(x)) {
      throw new Error("row already used");
    }
    usedRow.push(x);
    usedColumn.push(y);
    board[x][y] = ship;
    console.log(board);
    return board;
  };

  return { placeShip };
}

export { Gameboard };
import { Ship } from "./ship.js";
