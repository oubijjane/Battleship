function player() {
  const board = Gameboard();
  let turn = true;
  //default positions
  let positions = [
    [0, 6],
    [1, 7],
    [2, 3],
    [2, 9],
    [5, 4],
    [6, 6],
    [7, 2],
    [8, 3],
    [9, 5],
    [0, 0],
  ];

  const getBoard = () => board;
  const place = ()=> {
    for(let i = 0; i < positions.length; i++) {
      board.placeShip(board.getShips()[i], positions[i][0], positions[i][1]);
    }
  }
  const setPositions = (values) => positions = values;
  const takeTurn = () => (turn = true);
  const endTurn = () => (turn = false);
  const getTurn = () => turn;
  return { getBoard, place, takeTurn, endTurn, getTurn, setPositions };
}
import { Gameboard } from "./Gameboard.js";
export { player };
