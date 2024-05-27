export default class gameScreen {
  constructor() {}

  createElements() {
    const main = document.querySelector("main");

    const gameScreen = document.createElement("div");
    gameScreen.className = "game-screen";

    const logo = document.createElement("div");
    logo.className = "logo";

    const image = document.createElement("img");
    image.src = "assets/battleship-logo.png";
    image.alt = "Battleship logo";
    image.width = "167";
    image.height = "32";

    const dialogueBox = document.createElement("div");
    dialogueBox.className = "dialogue-box";

    const dialogue = document.createElement("h2");
    dialogue.className = "dialogue-content";
    dialogue.textContent = "AWAITING ORDERS...";

    const boards = document.createElement("div");
    boards.className = "boards";

    const playerOneBoard = document.createElement("div");
    playerOneBoard.className = "playerOneBoard";

    const playerOneName = document.createElement("h2");
    playerOneName.className = "playerOneName";
    playerOneName.textContent = "PLAYER";

    const playerOneCells = document.createElement("div");
    playerOneCells.className = "cells";

    const playerTwoBoard = document.createElement("div");
    playerTwoBoard.className = "playerTwoBoard";

    const playerTwoName = document.createElement("h2");
    playerTwoName.className = "playerTwoName";
    playerTwoName.textContent = "ENEMY";

    const playerTwoCells = document.createElement("div");
    playerTwoCells.className = "cells";

    main.appendChild(gameScreen);
    gameScreen.appendChild(logo);
    logo.appendChild(image);
    gameScreen.appendChild(dialogueBox);
    dialogueBox.appendChild(dialogue);
    gameScreen.appendChild(boards);
    boards.appendChild(playerOneBoard);
    playerOneBoard.appendChild(playerOneName);
    playerOneBoard.appendChild(playerOneCells);
    boards.appendChild(playerTwoBoard);
    playerTwoBoard.appendChild(playerTwoName);
    playerTwoBoard.appendChild(playerTwoCells);
  }

  drawScreen() {
    this.createElements();
  }

  clearScreen() {
    const main = document.querySelector("main");
    main.innerHTML = "";
  }
}
