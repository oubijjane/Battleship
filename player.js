function player() {
  const board = Gameboard();

  const getBoard = () => board;

  const place = () => {
    board.placeShip(board.getShips()[0], 1, 1);
    board.placeShip(board.getShips()[1], 2, 2);
    board.placeShip(board.getShips()[2], 3, 3);
    board.placeShip(board.getShips()[3], 4, 4);
    board.placeShip(board.getShips()[4], 5, 5);
    board.placeShip(board.getShips()[5], 6, 6);
    board.placeShip(board.getShips()[6], 7, 2);
    board.placeShip(board.getShips()[7], 8, 3);
    board.placeShip(board.getShips()[8], 9, 5);
    board.placeShip(board.getShips()[9], 0, 0); 
  };

  return { getBoard, place };
}

import { Gameboard } from "./Gameboard.js";
export { player };
