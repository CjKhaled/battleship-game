import Ship from "../classes/ship";

test("Ship object instantiated correctly", () => {
  expect(new Ship(3, 0)).toEqual({ length: 3, numHits: 0, sunk: false });
});

test("Hit function works correctly", () => {
  const testShip = new Ship(3, 0);
  expect(testShip.getNumHits()).toBe(0);
  expect(testShip.hit()).toBe(true);
  expect(testShip.getNumHits()).toBe(1);
  expect(testShip.hit()).toBe(true);
  expect(testShip.getNumHits()).toBe(2);
  expect(testShip.hit()).toBe(true);
  expect(testShip.getNumHits()).toBe(3);
  expect(testShip.hit()).toBe(false);
  expect(testShip.getNumHits()).toBe(3);
});

test("Sunk function works correctly", () => {
  const testShip = new Ship(3, 2);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
