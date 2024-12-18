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
      ship.setLenght(1);
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
    checkIfempty(ship, x, y);
    for (let i = 0; i < ship.getLenght(); i++) {
      board[x][y] = ship;
      y++;
    }
    return board;
  };

  const checkIfempty = (ship, x, y) => {
    if (y + ship.getLenght() > board.length - 1) {
      throw new Error("no enough space");
    }
    if (usedColumn.includes(y) && usedRow.includes(x)) {
      throw new Error("cell already used");
    }
    usedRow.push(x);
    for (let i = 0; i < ship.getLenght(); i++) {
      usedColumn.push(y);
      y++;
    }
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
    if (ships.some((ship) => !ship.isSunk())) {
      return false;
    }
    return true;
  };
  const getBoard = () => [...board];
  return { placeShip, receiveAttack, getShips, allShipsSunks, getBoard };
}

export { Gameboard };
import { Ship } from "./ship.js";
