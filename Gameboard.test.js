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
  expect(board.receiveAttack(4, 2)).toBe(1);
});

test("receive an attack without a ship", () => {
  const board = Gameboard();
  expect(board.receiveAttack(4, 2)).toBeNull();
  expect(board.receiveAttack(4, 3)).toBeNull();
});

test("receive an attack twice at the same position", () => {
  const board = Gameboard();
  board.receiveAttack(4, 2);
  expect(board.receiveAttack(4, 2)).toBe("already attaked");
});

test("ships have not been sunk", () => {
  const board = Gameboard();
  const ship = expect(board.allShipsSunks()).toBeFalsy();
});
/* didn't find any solution yet to mock the isSunk() function
describe("test", () => {
  Ship.isSunk = jest.fn(() => {
    return "bar";
  });
  test("ships have been sunk", () => {
    const board = Gameboard();
    let ship = Ship();
    console.log(ship.isSunk());
    expect(board.allShipsSunks()).toBeTruthy();
  });
}); */
