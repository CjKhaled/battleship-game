import Gameboard from "../../classes/gameboard.js";

export default class planScreen {
  constructor() {
    this.boardToSend = new Gameboard();
  }

  getCompleteBoard() {
    return this.boardToSend;
  }

  createElements() {
    const main = document.querySelector("main");

    const planScreen = document.createElement("div");
    planScreen.className = "plan-screen";

    const planTitle = document.createElement("h2");
    planTitle.className = "plan-title";
    planTitle.textContent = "WHAT'S OUR FORMATION GENERAL?";

    const axisButtons = document.createElement("div");
    axisButtons.className = "axis-buttons";

    const xAxisButton = document.createElement("button");
    xAxisButton.className = "axis-button selected";
    xAxisButton.textContent = "X AXIS";

    const yAxisButton = document.createElement("button");
    yAxisButton.className = "axis-button";
    yAxisButton.textContent = "Y AXIS";

    const errorMsg = document.createElement("span");
    errorMsg.className = "plan-error-msg";
    errorMsg.textContent = "You need to place all ships.";

    const planArea = document.createElement("div");
    planArea.className = "plan-area";

    const planRules = document.createElement("div");
    planRules.className = "plan-rules";

    const ruleTitle = document.createElement("h2");
    ruleTitle.textContent = "How To Play";

    const rules = document.createElement("ul");
    rules.className = "rules";

    const ruleOne = document.createElement("li");
    ruleOne.textContent = "Put a ship on the board by dragging it.";

    const ruleTwo = document.createElement("li");
    ruleTwo.textContent =
      "Use the axis buttons to place horizontally or vertically before dragging.";

    const ruleThree = document.createElement("li");
    ruleThree.textContent = "Click the reset button to replace all your ships.";

    const ruleFour = document.createElement("li");
    ruleFour.textContent = "Click random button to randomly place ships.";

    const tempBoard = document.createElement("div");
    tempBoard.className = "temp-board";

    const tempCells = document.createElement("div");
    tempCells.className = "temp cells";

    const draggableShips = document.createElement("div");
    draggableShips.className = "draggable-ships";

    const carrier = document.createElement("div");
    carrier.id = "carrier";
    carrier.className = "battle-ship";
    carrier.draggable = "true";
    carrier.dataset.length = "5";
    carrier.textContent = "Carrier (5 cells)";

    const battleship = document.createElement("div");
    battleship.id = "battleship";
    battleship.className = "battle-ship";
    battleship.draggable = "true";
    battleship.dataset.length = "4";
    battleship.textContent = "Battleship (4 cells)";

    const cruiser = document.createElement("div");
    cruiser.id = "cruiser";
    cruiser.className = "battle-ship";
    cruiser.draggable = "true";
    cruiser.dataset.length = "3";
    cruiser.textContent = "Cruiser (3 cells)";

    const submarine = document.createElement("div");
    submarine.id = "submarine";
    submarine.className = "battle-ship";
    submarine.draggable = "true";
    submarine.dataset.length = "3";
    submarine.textContent = "Submarine (3 Cells)";

    const destroyer = document.createElement("div");
    destroyer.id = "destroyer";
    destroyer.className = "battle-ship";
    destroyer.draggable = "true";
    destroyer.dataset.length = "2";
    destroyer.textContent = "Destroyer (2 cells)";

    const functionButtons = document.createElement("div");
    functionButtons.className = "function-buttons";

    const resetButton = document.createElement("button");
    resetButton.className = "function-button";
    resetButton.id = "reset";
    resetButton.textContent = "RESET";

    const confirmButton = document.createElement("div");
    confirmButton.className = "function-button";
    confirmButton.id = "confirm";
    confirmButton.textContent = "CONFIRM";

    const randomButton = document.createElement("div");
    randomButton.className = "function-button";
    randomButton.id = "random";
    randomButton.textContent = "RANDOM";

    main.appendChild(planScreen);
    planScreen.appendChild(planTitle);
    planScreen.appendChild(axisButtons);
    axisButtons.appendChild(xAxisButton);
    axisButtons.appendChild(yAxisButton);
    planScreen.appendChild(errorMsg);
    planScreen.appendChild(planArea);

    planArea.appendChild(planRules);
    planRules.appendChild(ruleTitle);
    planRules.appendChild(rules);
    rules.appendChild(ruleOne);
    rules.appendChild(ruleTwo);
    rules.appendChild(ruleThree);
    rules.appendChild(ruleFour);

    planArea.appendChild(tempBoard);
    tempBoard.appendChild(tempCells);
    planArea.appendChild(draggableShips);
    draggableShips.appendChild(carrier);
    draggableShips.appendChild(battleship);
    draggableShips.appendChild(cruiser);
    draggableShips.appendChild(submarine);
    draggableShips.appendChild(destroyer);
    planScreen.appendChild(functionButtons);
    functionButtons.appendChild(resetButton);
    functionButtons.appendChild(randomButton);
    functionButtons.appendChild(confirmButton);
  }

  drawScreen() {
    this.createElements();
  }

  clearScreen() {
    const main = document.querySelector("main");
    main.innerHTML = "";
  }

  drawTempBoard() {
    const tempCells = document.querySelector("div.temp.cells");
    tempCells.innerHTML = "";
    for (let x = 0; x < this.boardToSend.getBoard().length; x++) {
      for (let y = 0; y < this.boardToSend.getBoard()[x].length; y++) {
        const tempCell = document.createElement("div");
        tempCell.className = "temp-cell";
        tempCell.id = [x, y];
        tempCells.appendChild(tempCell);
      }
    }
  }

  addEventListeners() {
    const battleShips = [...document.querySelectorAll(".battle-ship")];
    const dropCells = [...document.querySelectorAll(".temp-cell")];
    const axisButtons = [...document.querySelectorAll("button.axis-button")];
    const resetButton = document.getElementById("reset");
    const randomButton = document.getElementById("random");
    let isXAxis = true;
    let elementBeingDragged = null;

    resetButton.addEventListener("click", (e) => {
      this.resetBoard();
    });

    randomButton.addEventListener("click", (e) => {
      this.randomPlacements();
    });

    axisButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.textContent == "X AXIS") isXAxis = true;
        else isXAxis = false;
        axisButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
      });
    });

    battleShips.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        e.target.classList.add("dragging");
        elementBeingDragged = e.target;

        // making it easier to see where you place
        e.dataTransfer.setDragImage(e.target, -40, -40);
        e.dataTransfer.clearData();
        e.dataTransfer.setData("shipID", e.target.id);
        e.dataTransfer.setData("shipLength", e.target.dataset.length);
      });

      ship.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");
        elementBeingDragged = null;
      });
    });

    dropCells.forEach((cell) => {
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      cell.addEventListener("dragenter", (e) => {
        e.preventDefault();
        const rowCoord = parseInt(e.target.id[0]);
        const colCoord = parseInt(parseInt(e.target.id[2]));
        const shipLength = parseInt(elementBeingDragged.dataset.length);
        this.updateHighlight(isXAxis, rowCoord, colCoord, shipLength, "add");
      });

      cell.addEventListener("dragleave", (e) => {
        const rowCoord = parseInt(e.target.id[0]);
        const colCoord = parseInt(parseInt(e.target.id[2]));
        const shipLength = parseInt(elementBeingDragged.dataset.length);
        this.updateHighlight(isXAxis, rowCoord, colCoord, shipLength, "remove");
      });

      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        const shipLength = parseInt(e.dataTransfer.getData("shipLength"));
        const rowCoord = parseInt(e.target.id[0]);
        const colCoord = parseInt(e.target.id[2]);
        // we should only be able to drop valid placements
        if ("valid" == e.target.classList[2]) {
          const shipID = e.dataTransfer.getData("shipID");
          const battleShip = document.getElementById(shipID);
          battleShip.className = "battle-ship placed";
          this.updateHighlight(
            isXAxis,
            rowCoord,
            colCoord,
            shipLength,
            "place",
            shipID
          );
        } else
          this.updateHighlight(
            isXAxis,
            rowCoord,
            colCoord,
            shipLength,
            "remove"
          );
      });
    });
  }

  checkOverlappingShips(isXAxis, rowCoord, colCoord, shipLength) {
    let overlapped = false;
    if (isXAxis) {
      for (let i = colCoord; i < colCoord + shipLength; i++) {
        if (i > 9) break;
        else {
          const cellToCheck = document.getElementById(`${rowCoord},${i}`);
          if (cellToCheck.classList.contains("placed")) {
            overlapped = true;
            return overlapped;
          }
        }
      }
    } else {
      for (let i = rowCoord; i < rowCoord + shipLength; i++) {
        if (i > 9) break;
        else {
          const cellToCheck = document.getElementById(`${i},${colCoord}`);
          if (cellToCheck.classList.contains("placed")) {
            overlapped = true;
            return overlapped;
          }
        }
      }
    }

    return overlapped;
  }

  updateHighlight(isXAxis, rowCoord, colCoord, shipLength, action, shipName) {
    if (action == "add") {
      if (isXAxis) {
        // check overlapping ships as you shouldn't be place them
        // if we are overlapped, we return true, otherwise return false
        let highlightValid =
          shipLength + colCoord > 10
            ? "invalid"
            : this.checkOverlappingShips(
                isXAxis,
                rowCoord,
                colCoord,
                shipLength
              )
            ? "invalid"
            : "valid";
        const cell = document.getElementById(`${rowCoord},${colCoord}`);
        for (let i = colCoord; i < colCoord + shipLength; i++) {
          if (i > 9) break;
          else {
            const cellToHighlight = document.getElementById(`${rowCoord},${i}`);
            if (!cellToHighlight.classList.contains("placed")) {
              cellToHighlight.classList.add("highlight");
              cellToHighlight.classList.add(highlightValid);
            }
          }
        }
      } else {
        let highlightValid =
          shipLength + rowCoord > 10
            ? "invalid"
            : this.checkOverlappingShips(
                isXAxis,
                rowCoord,
                colCoord,
                shipLength
              )
            ? "invalid"
            : "valid";
        const cell = document.getElementById(`${rowCoord},${colCoord}`);
        for (let i = rowCoord; i < rowCoord + shipLength; i++) {
          if (i > 9) break;
          else {
            const cellToHighlight = document.getElementById(`${i},${colCoord}`);
            if (!cellToHighlight.classList.contains("placed")) {
              cellToHighlight.classList.add("highlight");
              cellToHighlight.classList.add(highlightValid);
            }
          }
        }
      }
    } else if (action == "remove") {
      if (isXAxis) {
        for (let i = colCoord; i < colCoord + shipLength; i++) {
          if (i > 9) break;
          else {
            const cellToRemoveHighlight = document.getElementById(
              `${rowCoord},${i}`
            );
            if (!cellToRemoveHighlight.classList.contains("placed")) {
              cellToRemoveHighlight.className = "temp-cell";
            }
          }
        }
      } else {
        for (let i = rowCoord; i < rowCoord + shipLength; i++) {
          if (i > 9) break;
          else {
            const cellToRemoveHighlight = document.getElementById(
              `${i},${colCoord}`
            );
            if (!cellToRemoveHighlight.classList.contains("placed")) {
              cellToRemoveHighlight.className = "temp-cell";
            }
          }
        }
      }
    } else if (action == "place") {
      if (isXAxis) {
        for (let i = colCoord; i < colCoord + shipLength; i++) {
          if (i > 9) break;
          else {
            const cellToPlaceShip = document.getElementById(`${rowCoord},${i}`);
            this.boardToSend.getBoard()[rowCoord][i] = shipName;
            cellToPlaceShip.classList.add("placed");
          }
        }
      } else {
        for (let i = rowCoord; i < rowCoord + shipLength; i++) {
          if (i > 9) break;
          else {
            const cellToPlaceShip = document.getElementById(`${i},${colCoord}`);
            this.boardToSend.getBoard()[i][colCoord] = shipName;
            cellToPlaceShip.classList.add("placed");
          }
        }
      }
    }
  }

  resetBoard() {
    this.boardToSend.resetBoard();
    const errorMsg = document.querySelector(".plan-error-msg");
    errorMsg.classList.remove("active");

    const tempCells = [...document.querySelectorAll(".temp-cell")];
    tempCells.forEach((cell) => {
      cell.className = "temp-cell";
    });

    const battleShips = [...document.querySelectorAll(".battle-ship")];
    battleShips.forEach((battleship) => {
      battleship.className = "battle-ship";
    });
  }

  randomPlacements() {
    this.resetBoard();
    const battleShips = [...document.querySelectorAll(".battle-ship")];
    battleShips.forEach((battleship) => {
      battleship.className = "battle-ship placed";
    });

    // code from placeComputerShips function in gameboard module
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
              if (this.boardToSend.getBoard()[row][i] == 0) {
                space++;
              }
            }

            if (space == shipLengths[index]) {
              placed = true;
            }

            if (placed) {
              for (let i = col; i < col + shipLengths[index]; i++) {
                // updating board
                const cellToPlaceShip = document.getElementById(`${row},${i}`);
                this.boardToSend.getBoard()[row][i] = battleShips[index].id;
                cellToPlaceShip.classList.add("highlight");
                cellToPlaceShip.classList.add("valid");
                cellToPlaceShip.classList.add("placed");

                // add buffer zone
                if (i == col) {
                  if (col > 0) {
                    if (this.boardToSend.getBoard()[row][col - 1] == 0)
                      this.boardToSend.getBoard()[row][col - 1] = -1;
                    if (
                      row > 0 &&
                      this.boardToSend.getBoard()[row - 1][col - 1] == 0
                    )
                      this.boardToSend.getBoard()[row - 1][col - 1] = -1;
                    if (
                      row < 9 &&
                      this.boardToSend.getBoard()[row + 1][col - 1] == 0
                    )
                      this.boardToSend.getBoard()[row + 1][col - 1] = -1;
                  }
                }
                if (i == col + shipLengths[index] - 1) {
                  if (col + shipLengths[index] < 10) {
                    if (
                      this.boardToSend.getBoard()[row][
                        col + shipLengths[index]
                      ] == 0
                    )
                      this.boardToSend.getBoard()[row][
                        col + shipLengths[index]
                      ] = -1;
                    if (
                      row > 0 &&
                      this.boardToSend.getBoard()[row - 1][
                        col + shipLengths[index]
                      ] == 0
                    )
                      this.boardToSend.getBoard()[row - 1][
                        col + shipLengths[index]
                      ] = -1;
                    if (
                      row < 9 &&
                      this.boardToSend.getBoard()[row + 1][
                        col + shipLengths[index]
                      ] == 0
                    )
                      this.boardToSend.getBoard()[row + 1][
                        col + shipLengths[index]
                      ] = -1;
                  }
                }
                if (row > 0 && this.boardToSend.getBoard()[row - 1][i] == 0)
                  this.boardToSend.getBoard()[row - 1][i] = -1;
                if (row < 9 && this.boardToSend.getBoard()[row + 1][i] == 0)
                  this.boardToSend.getBoard()[row + 1][i] = -1;
              }
              index++;
            }
          }
        } else {
          // y-axis
          if (row + shipLengths[index] < 10) {
            let space = 0;
            for (let i = row; i < row + shipLengths[index]; i++) {
              if (this.boardToSend.getBoard()[i][col] == 0) {
                space++;
              }
            }

            if (space == shipLengths[index]) {
              placed = true;
            }

            if (placed) {
              for (let i = row; i < row + shipLengths[index]; i++) {
                const cellToPlaceShip = document.getElementById(`${i},${col}`);
                this.boardToSend.getBoard()[i][col] = battleShips[index].id;
                cellToPlaceShip.classList.add("highlight");
                cellToPlaceShip.classList.add("valid");
                cellToPlaceShip.classList.add("placed");

                // add buffer zone
                if (i == row) {
                  if (row > 0) {
                    if (this.boardToSend.getBoard()[row - 1][col] == 0)
                      this.boardToSend.getBoard()[row - 1][col] = -1;
                    if (
                      col > 0 &&
                      this.boardToSend.getBoard()[row - 1][col - 1] == 0
                    )
                      this.boardToSend.getBoard()[row - 1][col - 1] = -1;
                    if (
                      col < 9 &&
                      this.boardToSend.getBoard()[row - 1][col + 1] == 0
                    )
                      this.boardToSend.getBoard()[row - 1][col + 1] = -1;
                  }
                }
                if (i == row + shipLengths[index] - 1) {
                  if (row + shipLengths[index] < 10) {
                    if (
                      this.boardToSend.getBoard()[row + shipLengths[index]][
                        col
                      ] == 0
                    )
                      this.boardToSend.getBoard()[row + shipLengths[index]][
                        col
                      ] = -1;
                    if (
                      col > 0 &&
                      this.boardToSend.getBoard()[row + shipLengths[index]][
                        col - 1
                      ] == 0
                    )
                      this.boardToSend.getBoard()[row + shipLengths[index]][
                        col - 1
                      ] = -1;
                    if (
                      col < 9 &&
                      this.boardToSend.getBoard()[row + shipLengths[index]][
                        col + 1
                      ] == 0
                    )
                      this.boardToSend.getBoard()[row + shipLengths[index]][
                        col + 1
                      ] = -1;
                  }
                }
                if (col > 0 && this.boardToSend.getBoard()[i][col - 1] == 0)
                  this.boardToSend.getBoard()[i][col - 1] = -1;
                if (col < 9 && this.boardToSend.getBoard()[i][col + 1] == 0)
                  this.boardToSend.getBoard()[i][col + 1] = -1;
              }

              index++;
            }
          }
        }
      }
    }

    // clean up buffer spots
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.boardToSend.getBoard()[i][j] == -1) {
          this.boardToSend.getBoard()[i][j] = 0;
        }
      }
    }
  }
}
