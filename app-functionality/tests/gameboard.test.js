import Gameboard from "../classes/gameboard";
import Ship from "../classes/ship";

test("Correct board creation", () => {
  // the board should be initaited as a 2D array
  // with empty spots as zeros, and ships spots as 1
  const testBoard = new Gameboard();
  // random spots
  expect(testBoard.getBoard()[0][0]).toBe(0);
  expect(testBoard.getBoard()[9][9]).toBe(0);
  expect(testBoard.getBoard()[8][8]).toBe(0);
  expect(testBoard.getShipCount()).toBe(5);
});

test("Correctly places ships", () => {
  const testBoard = new Gameboard();
  testBoard.placeShips();
  // ships will be hardcode placed with this function
  // they should not allow other ships to be
  // placed anywhere they are

  // ship 1
  expect(testBoard.getBoard()[0][2]).toBe(1);
  expect(testBoard.getBoard()[1][2]).toBe(1);
  expect(testBoard.getBoard()[2][2]).toBe(1);
  expect(testBoard.getBoard()[3][2]).toBe(1);
  expect(testBoard.getBoard()[4][2]).toBe(1);

  // ship 2
  expect(testBoard.getBoard()[4][6]).toBe(1);
  expect(testBoard.getBoard()[5][6]).toBe(1);
  expect(testBoard.getBoard()[6][6]).toBe(1);
  expect(testBoard.getBoard()[7][6]).toBe(1);

  // ship 3
  expect(testBoard.getBoard()[0][7]).toBe(1);
  expect(testBoard.getBoard()[1][7]).toBe(1);
  expect(testBoard.getBoard()[2][7]).toBe(1);

  // ship 4
  expect(testBoard.getBoard()[7][1]).toBe(1);
  expect(testBoard.getBoard()[7][2]).toBe(1);
  expect(testBoard.getBoard()[7][3]).toBe(1);

  // ship 5
  expect(testBoard.getBoard()[9][4]).toBe(1);
  expect(testBoard.getBoard()[9][5]).toBe(1);
});

test("Logs ships coordinates correctly", () => {
  const testBoard = new Gameboard();
  testBoard.placeShips();

  // we hold ships in a map that stores the ship name as a key
  // and the ships coordinates as the values
  // the ship object will be the first element in the array of values
  // when a ship is

  // ship 1
  expect(testBoard.getShips().get("ship1")).toContainEqual([0, 2]);
  expect(testBoard.getShips().get("ship1")).toContainEqual({
    length: 5,
    numHits: 0,
    sunk: false,
  });

  // ship 2
  expect(testBoard.getShips().get("ship2")).toContainEqual([4, 6]);
  expect(testBoard.getShips().get("ship2")).toContainEqual({
    length: 4,
    numHits: 0,
    sunk: false,
  });

  // ship 3
  expect(testBoard.getShips().get("ship3")).toContainEqual([0, 7]);
  expect(testBoard.getShips().get("ship3")).toContainEqual({
    length: 3,
    numHits: 0,
    sunk: false,
  });

  // ship 4
  expect(testBoard.getShips().get("ship4")).toContainEqual([7, 1]);
  expect(testBoard.getShips().get("ship4")).toContainEqual({
    length: 3,
    numHits: 0,
    sunk: false,
  });

  // ship 5
  expect(testBoard.getShips().get("ship5")).toContainEqual([9, 4]);
  expect(testBoard.getShips().get("ship5")).toContainEqual({
    length: 2,
    numHits: 0,
    sunk: false,
  });
});

test("Receive attack logs missed attacks", () => {
  const testBoard = new Gameboard();
  testBoard.placeShips();

  expect(testBoard.getMissedAttacks().length).toBe(0);

  testBoard.receiveAttack(0, 0);

  // a cell that was missed should be equal to 3
  expect(testBoard.getMissedAttacks()).toContainEqual([0, 0]);
  expect(testBoard.getBoard()[0][0]).toBe(3);
});

test("Receive attack correctly hits a ship", () => {
  const testBoard = new Gameboard();
  testBoard.placeShips();
  testBoard.receiveAttack(0, 2);

  // the function should hit the ship, remove the ships coordinate
  // that was hit in our data structure, and change the cell to 2
  expect(testBoard.getShips().get("ship1")[0].getNumHits()).toBe(1);
  expect(testBoard.getShips().get("ship1")).not.toContain([0, 2]);
  expect(testBoard.getBoard()[0][2]).toBe(2);
});

test("Receive attack doesn't hit a spot twice", () => {
  const testBoard = new Gameboard();
  testBoard.placeShips();
  testBoard.receiveAttack(0, 2);
  testBoard.receiveAttack(0, 2);

  expect(testBoard.getShips().get("ship1")[0].getNumHits()).toBe(1);
});

test("Receive attack correctly sinks a ship", () => {
  const testBoard = new Gameboard();
  testBoard.placeShips();

  testBoard.receiveAttack(9, 4);
  testBoard.receiveAttack(9, 5);

  // the function should hit the ship and remove the it from the map
  expect([...testBoard.getShips().keys()]).not.toContain("ship5");
});

test("Sinking all ships is recorded", () => {
  const testBoard = new Gameboard();
  testBoard.placeShips();

  testBoard.receiveAttack(0, 2);
  testBoard.receiveAttack(1, 2);
  testBoard.receiveAttack(2, 2);
  testBoard.receiveAttack(3, 2);
  testBoard.receiveAttack(4, 2);

  testBoard.receiveAttack(4, 6);
  testBoard.receiveAttack(5, 6);
  testBoard.receiveAttack(6, 6);
  testBoard.receiveAttack(7, 6);

  testBoard.receiveAttack(0, 7);
  testBoard.receiveAttack(1, 7);
  testBoard.receiveAttack(2, 7);

  testBoard.receiveAttack(7, 1);
  testBoard.receiveAttack(7, 2);
  testBoard.receiveAttack(7, 3);

  testBoard.receiveAttack(9, 4);
  testBoard.receiveAttack(9, 5);

  expect(testBoard.getGameOverStatus()).toBe(true);
});
