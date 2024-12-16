import { ship } from "./ship.js";

console.log(ship());

test("it's got hit", () => {
    const testShip = ship();
  expect(testShip.hit()).toBe(1);
});
test("is the ship sunk yet?", () => {
    const testShip = ship();
    testShip.setLenght(2);
    expect(testShip.isSunk()).toBeFalsy();

})

test("is the ship sunk yet? 2", () => {
    const testShip = ship();
    testShip.setLenght(1);
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();

})

