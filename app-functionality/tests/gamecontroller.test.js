import Gamecontroller from "../classes/gamecontroller";

test("Starting the game with AI works correctly", () => {
  const testGameController = new Gamecontroller();
  testGameController.startGame("gary", false);

  expect(testGameController.getPlayerOneName()).toBe("Gary");
  expect(testGameController.getPlayerTwoName()).toBe("Computer");
  expect(testGameController.isPlayerOneTurn()).toBe(true);
  expect(testGameController.getGameStatus()).toBe(true);
});

test("Starting the game with two players works correctly", () => {
  const testGameController = new Gamecontroller();
  testGameController.startGame("gary", true, "fRank");

  expect(testGameController.getPlayerOneName()).toBe("Gary");
  expect(testGameController.getPlayerTwoName()).toBe("Frank");
  expect(testGameController.isPlayerOneTurn()).toBe(true);
  expect(testGameController.getGameStatus()).toBe(true);
});

test("Playing a turn works correctly", () => {
  const testGameController = new Gamecontroller();
  testGameController.startGame("gary", false);
  // player 1 should attack player 2
  testGameController.playTurn(0, 2);

  expect(testGameController.isPlayerOneTurn()).toBe(false);
});

test("Picking an invalid spot is handled correctly", () => {
  const testGameController = new Gamecontroller();
  testGameController.startGame("gary", false);
  // player 1 should attack player 2
  testGameController.playTurn(0, 2);
  // now player 2 should attack player 1
  testGameController.playTurn(0, 0);
  // now player 1 should attack player 2
  // the function should return false if the spot is invalid.
  expect(testGameController.playTurn(0, 2)).toBe(false);
});

test("Player 1 is able to win", () => {
  const testGameController = new Gamecontroller();
  testGameController.startGame("gary", false);

  testGameController.playTurn(0, 2);
  testGameController.playTurn(0, 0);
  testGameController.playTurn(1, 2);
  testGameController.playTurn(0, 1);
  testGameController.playTurn(2, 2);
  testGameController.playTurn(3, 7);
  testGameController.playTurn(3, 2);
  testGameController.playTurn(0, 3);
  testGameController.playTurn(4, 2);
  testGameController.playTurn(0, 4);

  testGameController.playTurn(4, 6);
  testGameController.playTurn(0, 5);
  testGameController.playTurn(5, 6);
  testGameController.playTurn(0, 6);
  testGameController.playTurn(6, 6);
  testGameController.playTurn(7, 4);
  testGameController.playTurn(7, 6);
  testGameController.playTurn(0, 8);

  testGameController.playTurn(0, 7);
  testGameController.playTurn(0, 9);
  testGameController.playTurn(1, 7);
  testGameController.playTurn(1, 0);
  testGameController.playTurn(2, 7);
  testGameController.playTurn(2, 0);

  testGameController.playTurn(7, 1);
  testGameController.playTurn(3, 0);
  testGameController.playTurn(7, 2);
  testGameController.playTurn(4, 0);
  testGameController.playTurn(7, 3);
  testGameController.playTurn(5, 0);

  testGameController.playTurn(9, 4);
  testGameController.playTurn(6, 0);
  expect(testGameController.playTurn(9, 5)).toBe("Gary wins!");
  expect(testGameController.getGameStatus()).toBe(false);
});

test("Player 2 is able to win", () => {
  const testGameController = new Gamecontroller();
  testGameController.startGame("gary", false);

  testGameController.playTurn(0, 0);
  testGameController.playTurn(0, 2);
  testGameController.playTurn(0, 1);
  testGameController.playTurn(1, 2);
  testGameController.playTurn(3, 7);
  testGameController.playTurn(2, 2);
  testGameController.playTurn(0, 3);
  testGameController.playTurn(3, 2);
  testGameController.playTurn(0, 4);
  testGameController.playTurn(4, 2);

  testGameController.playTurn(0, 5);
  testGameController.playTurn(4, 6);
  testGameController.playTurn(0, 6);
  testGameController.playTurn(5, 6);
  testGameController.playTurn(7, 4);
  testGameController.playTurn(6, 6);
  testGameController.playTurn(0, 8);
  testGameController.playTurn(7, 6);

  testGameController.playTurn(0, 9);
  testGameController.playTurn(0, 7);
  testGameController.playTurn(1, 0);
  testGameController.playTurn(1, 7);
  testGameController.playTurn(2, 0);
  testGameController.playTurn(2, 7);

  testGameController.playTurn(3, 0);
  testGameController.playTurn(7, 1);
  testGameController.playTurn(4, 0);
  testGameController.playTurn(7, 2);
  testGameController.playTurn(5, 0);
  testGameController.playTurn(7, 3);

  testGameController.playTurn(6, 0);
  testGameController.playTurn(9, 4);
  testGameController.playTurn(7, 5);
  expect(testGameController.playTurn(9, 5)).toBe("Computer wins!");
});
