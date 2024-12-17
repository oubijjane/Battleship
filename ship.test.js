import { Ship } from "./ship.js";


test("it's got hit", () => {
    const testShip = Ship();
  expect(testShip.hit()).toBe(1);
});
test("is the ship sunk yet?", () => {
    const testShip = Ship();
    testShip.setLenght(2);
    expect(testShip.isSunk()).toBeFalsy();

})

test("is the ship sunk yet? 2", () => {
    const testShip = Ship();
    testShip.setLenght(1);
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();

})

