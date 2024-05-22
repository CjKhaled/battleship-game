export default class Player {
  constructor(board, name) {
    this.board = board;
    this.name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    this.playerTurn = false;
  }

  getName() {
    return this.name;
  }

  setPlayerTurn(status) {
    this.playerTurn = status;
  }

  isPlayerTurn() {
    return this.playerTurn;
  }

  attack(enemyBoard, x, y) {
    if (this.isPlayerTurn()) {
      const outcome = enemyBoard.receiveAttack(x, y);
      // winning case
      if (outcome === "player wins") {
        return "player wins";
      }

      // hit a spot twice
      else if (outcome === false) {
        return false;
      }

      // turn was successful
      else if (outcome === true) {
        this.setPlayerTurn(false);
        return true;
      }
    } else return false;
  }

  getBoard() {
    return this.board;
  }
}
