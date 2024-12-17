function Gameboard() {
  const board = Array(10)
    .fill(null)
    .map(() => new Array(10).fill(null));
  const usedRow = [];
  const usedColumn = [];
  const attackedPositions = [];
  const missedAttack = [];
  const ships = [];

  const createShips = () => {
    for (let i = 0; i < 4; i++) {
      let ship = Ship();
      ship.setLenght(1)
      ships.push(ship);
    }
    for (let i = 0; i < 3; i++) {
      let ship = Ship();
      ship.setLenght(2);
      ships.push(ship);
    }
    for (let i = 0; i < 2; i++) {
      let ship = Ship();
      ship.setLenght(3);
      ships.push(ship);
    }
    let ship = Ship();
    ship.setLenght(4);
    ships.push(ship);
  };
  createShips();
  const getShips = () => [...ships];

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

  const receiveAttack = (x, y) => {
    if (isItAttackedTwice(x, y)) {
      return "already attaked";
    }
    if (isMissed(x, y)) {
      return null;
    }
    return board[x][y].hit();
  };

  const isItAttackedTwice = (x, y) => {
    if (
      attackedPositions.some(
        (position) => position[0] === x && position[1] === y
      )
    ) {
      return true;
    }

    attackedPositions.push([x, y]);
    return false;
  };
  const isMissed = (x, y) => {
    if (!board[x][y]) {
      missedAttack.push([x, y]);
      return true;
    }
    return false;
  };
  const allShipsSunks = () => {
    if(ships.some(ship => !ship.isSunk())) {
        return false;
    }
    return true;
  }

  return { placeShip, receiveAttack,getShips, allShipsSunks};
}

export { Gameboard };
import { Ship } from "./ship.js";
