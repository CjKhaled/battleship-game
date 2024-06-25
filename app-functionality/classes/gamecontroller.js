import Player from "./player.js";
import Gameboard from "./gameboard.js";

export default class Gamecontroller {
  constructor() {
    this.playerOne;
    this.playerTwo;
    this.playerOneTurn = false;
    this.gameRunning = false;
  }

  startGame(name, gameBoardOne) {
    this.playerOne = new Player(gameBoardOne, name);
    this.playerTwo = new Player(new Gameboard(), "Computer");

    this.playerOne.getBoard().placeShips();
    this.playerTwo.getBoard().placeComputerShips();

    this.playerOneTurn = true;
    this.gameRunning = true;
  }

  getPlayerOneName() {
    return this.playerOne.getName();
  }

  getPlayerOneBoard() {
    return this.playerOne.getBoard();
  }

  getPlayerTwoBoard() {
    return this.playerTwo.getBoard();
  }

  getPlayerTwoName() {
    return this.playerTwo.getName();
  }

  isPlayerOneTurn() {
    return this.playerOneTurn;
  }

  getGameStatus() {
    return this.gameRunning;
  }

  computerTurn(board) {
    let validCoords = false;
    const missedCoords = board.getMissedAttacks();
    const gameBoard = board.getBoard();
    while (validCoords == false) {
      // get coords that have not been missed
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      if (
        !missedCoords.some((coord) => coord[0] === row && coord[1] === column)
      ) {
        // if the cell is 0 or 1, we can attack the players board and finish the turn
        if (gameBoard[row][column] == 0 || gameBoard[row][column] == 1) {
          validCoords = true;
          return [row, column];
        }
      }
    }
  }

  playTurn(x, y) {
    // if it's playerOne's turn, we get playerTwo's board, and vice versa
    // the we attack the board with either the passed in coords,
    // or coords from the computer
    const enemyBoard = this.playerOneTurn
      ? this.playerTwo.getBoard()
      : this.playerOne.getBoard();
    const computerAttack = this.playerOneTurn ? [0,0] : this.computerTurn(enemyBoard);
    const result = this.playerOneTurn ? enemyBoard.receiveAttack(x, y) : enemyBoard.receiveAttack(computerAttack[0], computerAttack[1]);
    // game win case, successful case, and unsuccessful case
    if (result === "player wins") {
      this.gameRunning = false;
      return " wins!";
    } else if (result) {
      const latestAttack = enemyBoard.getLatestAttack()
      const returnResult = latestAttack.result == 2 ? "hit a ship" : "missed"
      const returnString = " attacked the coords " + latestAttack.coords[0] + ", " + latestAttack.coords[2] + "...and the attack " + returnResult + "!"
      this.playerOneTurn = !this.playerOneTurn;
      return returnString;
    } else return false;
  }
}
