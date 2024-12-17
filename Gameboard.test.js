import { Gameboard } from "./Gameboard.js";
import { Ship } from "./ship.js";

test("placing a ship", () => {
  const board = Gameboard();
  let ship = "a ship";
  expect(board.placeShip(ship, 9, 5)).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, "a ship", null, null, null, null],
  ]);

  expect(board.placeShip(ship, 0, 0)).toEqual([
    ["a ship", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, "a ship", null, null, null, null],
  ]);
});

test("should be a empty", () => {
  const board = Gameboard();
  let ship = "a ship";
  board.placeShip("test", 4, 2);
  expect(() => board.placeShip(ship, 4, 2)).toThrow("column already used");
  expect(() => board.placeShip(ship, 4, 3)).toThrow("row already used");
});

test("receive an attack", () => {
  const board = Gameboard();
  let ship = Ship();
  ship.setLenght(2);

  board.placeShip(ship, 4, 2);
  expect(board.receiveAttack(ship, 4, 2)).toBe(1);
  expect(board.receiveAttack(ship, 4, 2)).toBe(2);
});
