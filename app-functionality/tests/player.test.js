import Player from "../classes/player";
import Gameboard from "../classes/gameboard";

test("Player object is instantied correctly", () => {
  const testPlayer = new Player(new Gameboard(), "phil");
  expect(testPlayer.getName()).toBe("Phil");
  expect(testPlayer.isPlayerTurn()).toBe(false);
});

test("Attack function works correctly", () => {
  const testPlayer = new Player(new Gameboard(), "phil");
  testPlayer.setPlayerTurn(true)
  const testPlayer2 = new Player(new Gameboard(), "phil");

  expect(testPlayer.attack(testPlayer2.getBoard(), 0, 2)).toBe(true);
  expect(testPlayer.attack(testPlayer2.getBoard(), 0, 2)).toBe(false);
});
