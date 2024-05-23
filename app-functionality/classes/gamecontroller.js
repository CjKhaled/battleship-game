import Player from "./player";
import Gameboard from "./gameboard";

export default class Gamecontroller {
  constructor() {
    this.playerOne;
    this.playerTwo;
    this.playerOneTurn = false;
    this.gameRunning = false;
  }

  startGame(name1, multiplePlayers, name2) {
    // starting the game consists of creating our players, placing their
    // ships, changing our booleans, and storing the players
    this.playerOne = new Player(new Gameboard(), name1);
    this.playerTwo = multiplePlayers
      ? new Player(new Gameboard(), name2)
      : new Player(new Gameboard(), "Computer");

    this.playerOne.getBoard().placeShips();
    this.playerTwo.getBoard().placeShips();

    this.playerOneTurn = true;
    this.gameRunning = true;
  }

  getPlayerOneName() {
    return this.playerOne.getName();
  }

  getPlayerTwoName() {
    return this.playerTwo.getName();
  }

  isPlayerOneTurn() {
    return this.playerOneTurn;
  }

  getGameStatus() {
    return this.gameRunning
  }

  playTurn(x, y) {
    const enemyBoard = this.playerOneTurn ? this.playerTwo.getBoard() : this.playerOne.getBoard();
    const result = enemyBoard.receiveAttack(x, y)
    // game win case, successful case, and unsuccessful case
    if (result === "player wins") {
        this.gameRunning = false;
        return this.playerOneTurn ? this.playerOne.getName() + " wins!" : this.playerTwo.getName() + " wins!"
    } else if (result) {
        this.playerOneTurn = !this.playerOneTurn
        return true
    } else return false;
  }
}
