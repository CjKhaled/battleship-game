import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.missedAtacks = [];
    this.ships = this.createShips();
    this.gameOver = false;
    this.latestAttack = 0;
  }

  resetBoard() {
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
          this.board[x][y] = 0;
      }
    }
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    return board;
  }

  placeComputerShips() {
    const shipNames = [...this.ships.keys()];
    const shipLengths = [5, 4, 3, 3, 2];
    let index = 0;
    while (index < 5) {
      let placed = false;
      // check valid position
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const isXAxis = Math.random() < 0.5;
        if (isXAxis) {
          if (col + shipLengths[index] < 10) {
            // check overlap
            let space = 0;
            for (let i = col; i < col + shipLengths[index]; i++) {
              if (this.board[row][i] == 0) {
                space++;
              }
            }

            if (space == shipLengths[index]) {
              placed = true;
            }

            if (placed) {
              for (let i = col; i < col + shipLengths[index]; i++) {
                this.board[row][i] = 1;
                this.ships.get(shipNames[index]).push([row, i])

                // add buffer zone
                if (i == col) {
                  if (col > 0) {
                      if (this.board[row][col - 1] == 0) this.board[row][col - 1] = -1;
                      if (row > 0 && this.board[row - 1][col - 1] == 0) this.board[row - 1][col - 1] = -1;
                      if (row < 9 && this.board[row + 1][col - 1] == 0) this.board[row + 1][col - 1] = -1;
                  }
                }
                if (i == col + shipLengths[index] - 1) {
                  if (col + shipLengths[index] < 10) {
                      if (this.board[row][col + shipLengths[index]] == 0) this.board[row][col + shipLengths[index]] = -1;
                      if (row > 0 && this.board[row - 1][col + shipLengths[index]] == 0) this.board[row - 1][col + shipLengths[index]] = -1;
                      if (row < 9 && this.board[row + 1][col + shipLengths[index]] == 0) this.board[row + 1][col + shipLengths[index]] = -1;
                  }
                }
                if (row > 0 && this.board[row - 1][i] == 0) this.board[row - 1][i] = -1;
                if (row < 9 && this.board[row + 1][i] == 0) this.board[row + 1][i] = -1;
              }          
              index++;
            }
          }
        } else {
          // y-axis
          if (row + shipLengths[index] < 10) {
            let space = 0;
            for (let i = row; i < row + shipLengths[index]; i++) {
              if (this.board[i][col] == 0) {
                space++
              }
            }

            if (space == shipLengths[index]) {
              placed = true
            }

            if (placed) {
              for (let i = row; i < row + shipLengths[index]; i++) {
                this.board[i][col] = 1;
                this.ships.get(shipNames[index]).push([i, col])
                
                // add buffer zone
                if (i == row) {
                  if (row > 0) {
                      if (this.board[row - 1][col] == 0) this.board[row - 1][col] = -1;
                      if (col > 0 && this.board[row - 1][col - 1] == 0) this.board[row - 1][col - 1] = -1;
                      if (col < 9 && this.board[row - 1][col + 1] == 0) this.board[row - 1][col + 1] = -1;
                  }
                }
                if (i == row + shipLengths[index] - 1) {
                  if (row + shipLengths[index] < 10) {
                      if (this.board[row + shipLengths[index]][col] == 0) this.board[row + shipLengths[index]][col] = -1;
                      if (col > 0 && this.board[row + shipLengths[index]][col - 1] == 0) this.board[row + shipLengths[index]][col - 1] = -1;
                      if (col < 9 && this.board[row + shipLengths[index]][col + 1] == 0) this.board[row + shipLengths[index]][col + 1] = -1;
                  }
                } 
                if (col > 0 && this.board[i][col - 1] == 0) this.board[i][col - 1] = -1;
                if (col < 9 && this.board[i][col + 1] == 0) this.board[i][col + 1] = -1;
              }

              index++
            }
          }
        } 
      }
    }

    // clean up buffer spots 
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
          if (this.board[i][j] == -1) {
              this.board[i][j] = 0;
          }
      }
    }
  }

  createShips() {
    const ships = new Map();
    ships.set("carrier", [new Ship(5, 0)]);
    ships.set("battleship", [new Ship(4, 0)]);
    ships.set("cruiser", [new Ship(3, 0)]);
    ships.set("submarine", [new Ship(3, 0)]);
    ships.set("destroyer", [new Ship(2, 0)]);

    return ships;
  }

  getBoard() {
    return this.board;
  }

  getShipCount() {
    return this.ships.size;
  }

  placeShips() {
    // replace ship coordinate with 1 after identifying the ship
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board.length; y++) {
        if (this.board[x][y] == "carrier") {
          this.ships.get("carrier").push([x, y]);
          this.board[x][y] = 1;
        } else if (this.board[x][y] == "battleship") {
          this.ships.get("battleship").push([x, y]);
          this.board[x][y] = 1;
        } else if (this.board[x][y] == "cruiser") {
          this.ships.get("cruiser").push([x, y]);
          this.board[x][y] = 1;
        } else if (this.board[x][y] == "submarine") {
          this.ships.get("submarine").push([x, y]);
          this.board[x][y] = 1;
        } else if (this.board[x][y] == "destroyer") {
          this.ships.get("destroyer").push([x, y]);
          this.board[x][y] = 1;
        }
      }
    }
  }

  getShips() {
    return this.ships;
  }

  getMissedAttacks() {
    return this.missedAtacks;
  }

  receiveAttack(x, y) {
    // attack was missed
    if (this.board[x][y] === 0) {
      this.missedAtacks.push([x, y]);
      this.board[x][y] = 3;
      this.latestAttack = { coords: `${x},${y}`, result: 3 };
      return true;
    }

    // spot already hit
    else if (this.board[x][y] === 2 || this.board[x][y] === 3) {
      return false;
    }

    // hitting a ship
    else if (this.board[x][y] === 1) {
      let ship;
      let shipName;
      // we need to find which ship was hit
      for (const [key, value] of this.ships) {
        for (const coord of value) {
          if (coord[0] == x && coord[1] == y) {
            ship = value[0];
            shipName = key;
          }
        }
      }
      // remove its coordinate from our map and set the board to 2
      this.ships
        .get(shipName)
        .filter((cord) => !(cord[0] == x && cord[0] == y));
      this.board[x][y] = 2;
      this.latestAttack = { coords: `${x},${y}`, result: 2 };
      // and run the hit function on the ship object
      ship.hit();
      if (ship.isSunk()) {
        this.ships.delete(shipName);
      }

      if (this.getGameOverStatus()) {
        return "player wins";
      } else return true;
    }
  }

  getGameOverStatus() {
    if (this.ships.size === 0) {
      this.gameOver = true;
    }

    return this.gameOver;
  }

  getLatestAttack() {
    return this.latestAttack;
  }

  getCellFromCoords(x, y) {
    return this.board[x][y];
  }
}
