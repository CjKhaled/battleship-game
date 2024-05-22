import Ship from "./ship";

export default class Gameboard {
    constructor() {
        this.board = this.createBoard();
        this.missedAtacks = [];
        this.ships = this.createShips();
        this.gameOver = false;
    };

    createBoard() {
        const board = [];
        for (let i = 0; i < 10; i++) {
            board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }

        return board;
    };

    createShips() {
        const ships = new Map();
        ships.set("ship1", [new Ship(5, 0)])
        ships.set("ship2", [new Ship(4, 0)])
        ships.set("ship3", [new Ship(3, 0)])
        ships.set("ship4", [new Ship(3, 0)])
        ships.set("ship5", [new Ship(2, 0)])

        return ships;
    };

    getBoard() {
        return this.board
    };

    getShipCount() {
        return this.ships.size;
    };

    placeShips() {
        // placing each ship individually
        for (let i = 0; i < 5; i++) {
            this.board[i][2] = 1
            this.ships.get("ship1").push([i, 2])
        }

        for (let i = 4; i < 8; i++) {
            this.board[i][6] = 1
            this.ships.get("ship2").push([i, 6])
        }

        for (let i = 0; i < 3; i++) {
            this.board[i][7] = 1
            this.ships.get("ship3").push([i, 7])
        }

        for (let i = 1; i < 4; i++) {
            this.board[7][i] = 1
            this.ships.get("ship4").push([7, i])
        }
        
        for (let i = 4; i < 6; i++) {
            this.board[9][i] = 1
            this.ships.get("ship5").push([9, i])
        }
    };

    getShips() {
        return this.ships
    };

    getMissedAttacks() {
        return this.missedAtacks
    };

    receiveAttack(x, y) {
        // attack was missed
        if (this.board[x][y] === 0) {
            this.missedAtacks.push([x, y]);
            this.board[x][y] = 3
            return
        }

        // spot already hit
        else if (this.board[x][y] === 2 || this.board[x][y] === 3) {
            return false
        }

        // hitting a ship
        else if (this.board[x][y] === 1) {
            let ship;
            let shipName;
            // we need to find which ship was hit
            for (const [key, value] of this.ships) {
                for (const coord of value) {
                    if (coord[0] === x && coord[1] === y) {
                        ship = value[0];
                        shipName = key;
                    }
                }
            }
            // remove its coordinate from our map and set the board to 2
            this.ships.get(shipName).filter((cord) => !(cord[0] == x && cord[0] == y))
            this.board[x][y] = 2
            // and run the hit function on the ship object
            ship.hit();
            if (ship.isSunk()) {
                this.ships.delete(shipName);
            }
        }


    };

    getGameOverStatus() {
        if (this.ships.size === 0) {
            this.gameOver = true;
        }

        return this.gameOver
    };
}