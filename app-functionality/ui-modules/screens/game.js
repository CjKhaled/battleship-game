export default class gameScreen {
  constructor() {
    this.playerOne;
    this.playerTwo;
  }

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
    playerOneName.textContent = this.playerOne;

    const playerOneCells = document.createElement("div");
    playerOneCells.className = "cells one";

    const playerTwoBoard = document.createElement("div");
    playerTwoBoard.className = "playerTwoBoard";

    const playerTwoName = document.createElement("h2");
    playerTwoName.className = "playerTwoName";
    playerTwoName.textContent = this.playerTwo;

    const playerTwoCells = document.createElement("div");
    playerTwoCells.className = "cells two";

    const gameButtons = document.createElement('div');
    gameButtons.className = 'game-buttons'

    const cheatButton = document.createElement("button");
    cheatButton.className = "function-button";
    cheatButton.id = 'cheat';
    cheatButton.textContent = 'CHEAT';

    const restartButton = document.createElement("button");
    restartButton.className = "function-button";
    restartButton.id = 'restart';
    restartButton.textContent = 'RESTART';

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
    gameScreen.appendChild(gameButtons);
    gameButtons.appendChild(cheatButton);
    gameButtons.appendChild(restartButton);
  }
  

  addEventListeners(controller) {
    const cheatButton = document.querySelector('#cheat');
    cheatButton.addEventListener('click', (e) => {
      const computerCells = document.querySelector('.cells.two');
      computerCells.classList.toggle('show');
    })

    const playerTwoCells = [...document.querySelectorAll(".cells.two > *")];
    const playerTwoBoard = document.querySelector(".cells.two")

    playerTwoCells.forEach((cell) => {
      cell.addEventListener("click", async () => {
        // player won't be able to click again until dialogue is exhausted
        playerTwoBoard.classList.toggle('disable')
        
        const playerOneResult = controller.playTurn(
          cell.id[0],
          cell.id[2]
        );
        const dialogue = document.querySelector('h2.dialogue-content');
        dialogue.textContent = '';
        this.textTyping(dialogue, controller.getPlayerOneName() + playerOneResult)
        this.updateBoard(controller.getPlayerTwoBoard().getBoard(), cell)

        await this.delay(50 * (controller.getPlayerOneName() + playerOneResult).length + 1000);
        
        const playerTwoResult = controller.playTurn();
        dialogue.textContent = '';
        this.textTyping(dialogue, controller.getPlayerTwoName() + playerTwoResult)
        const cellTwo = document.getElementById(controller.getPlayerOneBoard().getLatestAttack().coords)
        this.updateBoard(controller.getPlayerOneBoard().getBoard(), cellTwo)

        await this.delay(50 * (controller.getPlayerTwoName() + playerTwoResult).length + 1000);
        dialogue.textContent = '';
        this.textTyping(dialogue, 'AWAITING ORDERS...')
        playerTwoBoard.classList.toggle('disable')
      });
    });
  }

  async textTyping(element, text, index = 0) {
    element.textContent += text[index];

    if (index == text.length - 1) {
        return
    }

    await this.delay(50);
    this.textTyping(element, text, index + 1);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  drawScreen() {
    this.createElements();
  }

  drawPlayerOneBoard(board) {
    // 0 - cell hasn't been hit
    // 1 - cell hasn't been hit and contains a ship
    // 2 - cell has been hit and contains a ship
    // 3 - cell has been hit and doesn't contain a ship
    const playerOneCells = document.querySelector(".cells.one");
    playerOneCells.innerHTML = "";
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const domCell = document.createElement("div");
        domCell.className =
          board[x][y] == 0
            ? "cell"
            : board[x][y] == 1
            ? "cell ship"
            : board[x][y] == 2
            ? "cell ship hit"
            : "cell miss";
        domCell.id = [x, y];
        if (domCell.className == "cell miss") {
          domCell.innerHTML =
            '<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 55.704 55.703" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M27.852,0C19.905,0,12.743,3.363,7.664,8.72C7.628,8.751,7.583,8.762,7.549,8.796C7.495,8.85,7.476,8.922,7.426,8.98 C2.833,13.949,0,20.568,0,27.852c0,15.357,12.493,27.851,27.851,27.851c15.356,0,27.851-12.494,27.851-27.851 C55.703,12.494,43.208,0,27.852,0z M4.489,27.851c0-5.315,1.805-10.207,4.806-14.138l32.691,32.694 c-3.93,3.001-8.819,4.806-14.135,4.806C14.969,51.213,4.489,40.732,4.489,27.851z M45.282,43.352l-32.933-32.93 c4.13-3.678,9.551-5.934,15.503-5.934c12.881,0,23.362,10.48,23.362,23.363C51.213,33.803,48.958,39.225,45.282,43.352z"></path> </g> </g></svg>';
        }

        if (domCell.className == "cell ship hit") {
          domCell.innerHTML =
            '<svg fill="#ffffff" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>bomb-explosion</title> <path d="M30.79 20.247v-1.813c-3.349-1.335-5.321-2.581-5.928-4.568-0.498-1.631 1.004-3.801 3.836-6.416-2.958 1.621-5.135 2.722-5.997 1.185-0.774-1.38 0.093-3.966 1.464-7.357h-0.976c-1.094 1.731-2.025 3.044-2.371 2.72-0.301-0.283-0.305-1.301-0.174-2.72l-2.022-0.001c-1.338 2.997-2.757 4.695-4.812 4.986-1.756 0.249-4.029-1.814-6.59-4.742 1.458 2.894 1.994 5.215 1.011 5.788-1.162 0.678-3.491-0.121-6.939-1.569v0.662c2.372 1.506 4.557 2.975 4.149 3.522-0.358 0.48-1.992 0.397-4.149 0.105v1.709c3.121 1.576 4.812 3.193 4.812 4.707 0 1.302-2.601 3.961-4.812 6.067v1.011c1.995-0.654 4.443-0.908 5.265 0.558 0.839 1.495 0.276 3.611-0.802 6.695h1.848c1.958-2.645 3.819-4.766 4.812-4.672 0.703 0.066 0.375 2.225-0.105 4.672h0.558c1.743-4.845 3.892-7.814 7.078-7.706 2.796 0.096 5.449 2.91 8.368 4.916-1.526-1.867-4.337-4.526-3.731-5.021 0.637-0.521 3.367 0.432 6.207 1.464v-0.907c-1.863-1.271-3.576-2.492-3.138-2.929 0.394-0.393 1.596-0.456 3.138-0.349zM21.948 18.081c-0.335 0.334 1.759 1.577 2.956 2.438-1.81-0.632-4.092-1.582-4.518-1.234-0.308 0.252 1.12 1.603 1.897 2.553-1.485-1.021-2.845-2.448-4.267-2.496-2.092-0.071-3.29 2.442-4.323 6.282 0.272-1.823 1.089-4.679 0.502-4.733-0.833-0.078-2.846 2.892-4.351 5.106 1.051-3.185 2.006-5 1.367-6.139-0.577-1.029-2.744-0.403-3.682 0.143 1.105-1.043 3.447-3.141 3.447-4.025 0-1.286-2.32-2.733-6.599-3.951 2.572 0.405 5.888 1.149 6.275 0.631 0.303-0.405-2.192-1.813-3.71-2.811 2.672 1.146 4.365 1.92 5.122 1.479 0.5-0.292 0.222-1.47-0.52-2.942 1.303 1.489 2.471 2.538 3.364 2.411 1.884-0.267 2.698-2.76 4.166-7.518l0 0c-0.345 2.648-1.044 5.965-0.614 6.369 0.322 0.303 1.636-2.144 2.65-3.701-1.144 2.886-2.245 5.056-1.69 6.045 0.439 0.782 1.552 0.23 3.056-0.594-1.44 1.33-2.214 2.433-1.961 3.263 0.503 1.647 2.857 2.292 7.065 3.766-2.161-0.28-5.135-0.842-5.634-0.344z"></path> </g></svg>';
        }
        playerOneCells.appendChild(domCell);
      }
    }
  }

  updateBoard(board, cell) {
    const x = cell.id[0]
    const y = cell.id[2]
    cell.className = board[x][y] == 2
    ? "cell ship hit"
    : "cell miss";

    if (cell.className == "cell miss") {
      cell.innerHTML =
        '<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 55.704 55.703" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M27.852,0C19.905,0,12.743,3.363,7.664,8.72C7.628,8.751,7.583,8.762,7.549,8.796C7.495,8.85,7.476,8.922,7.426,8.98 C2.833,13.949,0,20.568,0,27.852c0,15.357,12.493,27.851,27.851,27.851c15.356,0,27.851-12.494,27.851-27.851 C55.703,12.494,43.208,0,27.852,0z M4.489,27.851c0-5.315,1.805-10.207,4.806-14.138l32.691,32.694 c-3.93,3.001-8.819,4.806-14.135,4.806C14.969,51.213,4.489,40.732,4.489,27.851z M45.282,43.352l-32.933-32.93 c4.13-3.678,9.551-5.934,15.503-5.934c12.881,0,23.362,10.48,23.362,23.363C51.213,33.803,48.958,39.225,45.282,43.352z"></path> </g> </g></svg>';
    }

    if (cell.className == "cell ship hit") {
      cell.innerHTML =
        '<svg fill="#ffffff" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>bomb-explosion</title> <path d="M30.79 20.247v-1.813c-3.349-1.335-5.321-2.581-5.928-4.568-0.498-1.631 1.004-3.801 3.836-6.416-2.958 1.621-5.135 2.722-5.997 1.185-0.774-1.38 0.093-3.966 1.464-7.357h-0.976c-1.094 1.731-2.025 3.044-2.371 2.72-0.301-0.283-0.305-1.301-0.174-2.72l-2.022-0.001c-1.338 2.997-2.757 4.695-4.812 4.986-1.756 0.249-4.029-1.814-6.59-4.742 1.458 2.894 1.994 5.215 1.011 5.788-1.162 0.678-3.491-0.121-6.939-1.569v0.662c2.372 1.506 4.557 2.975 4.149 3.522-0.358 0.48-1.992 0.397-4.149 0.105v1.709c3.121 1.576 4.812 3.193 4.812 4.707 0 1.302-2.601 3.961-4.812 6.067v1.011c1.995-0.654 4.443-0.908 5.265 0.558 0.839 1.495 0.276 3.611-0.802 6.695h1.848c1.958-2.645 3.819-4.766 4.812-4.672 0.703 0.066 0.375 2.225-0.105 4.672h0.558c1.743-4.845 3.892-7.814 7.078-7.706 2.796 0.096 5.449 2.91 8.368 4.916-1.526-1.867-4.337-4.526-3.731-5.021 0.637-0.521 3.367 0.432 6.207 1.464v-0.907c-1.863-1.271-3.576-2.492-3.138-2.929 0.394-0.393 1.596-0.456 3.138-0.349zM21.948 18.081c-0.335 0.334 1.759 1.577 2.956 2.438-1.81-0.632-4.092-1.582-4.518-1.234-0.308 0.252 1.12 1.603 1.897 2.553-1.485-1.021-2.845-2.448-4.267-2.496-2.092-0.071-3.29 2.442-4.323 6.282 0.272-1.823 1.089-4.679 0.502-4.733-0.833-0.078-2.846 2.892-4.351 5.106 1.051-3.185 2.006-5 1.367-6.139-0.577-1.029-2.744-0.403-3.682 0.143 1.105-1.043 3.447-3.141 3.447-4.025 0-1.286-2.32-2.733-6.599-3.951 2.572 0.405 5.888 1.149 6.275 0.631 0.303-0.405-2.192-1.813-3.71-2.811 2.672 1.146 4.365 1.92 5.122 1.479 0.5-0.292 0.222-1.47-0.52-2.942 1.303 1.489 2.471 2.538 3.364 2.411 1.884-0.267 2.698-2.76 4.166-7.518l0 0c-0.345 2.648-1.044 5.965-0.614 6.369 0.322 0.303 1.636-2.144 2.65-3.701-1.144 2.886-2.245 5.056-1.69 6.045 0.439 0.782 1.552 0.23 3.056-0.594-1.44 1.33-2.214 2.433-1.961 3.263 0.503 1.647 2.857 2.292 7.065 3.766-2.161-0.28-5.135-0.842-5.634-0.344z"></path> </g></svg>';
    }
  }

  drawPlayerTwoBoard(board) {
    const playerTwoCells = document.querySelector(".cells.two");
    playerTwoCells.innerHTML = "";
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const domCell = document.createElement("div");
        domCell.className =
          board[x][y] == 0
            ? "cell"
            : board[x][y] == 1
            ? "cell ship"
            : board[x][y] == 2
            ? "cell ship hit"
            : "cell ship miss";
        domCell.id = [x, y];
        if (domCell.className == "cell miss") {
          domCell.innerHTML =
            '<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 55.704 55.703" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M27.852,0C19.905,0,12.743,3.363,7.664,8.72C7.628,8.751,7.583,8.762,7.549,8.796C7.495,8.85,7.476,8.922,7.426,8.98 C2.833,13.949,0,20.568,0,27.852c0,15.357,12.493,27.851,27.851,27.851c15.356,0,27.851-12.494,27.851-27.851 C55.703,12.494,43.208,0,27.852,0z M4.489,27.851c0-5.315,1.805-10.207,4.806-14.138l32.691,32.694 c-3.93,3.001-8.819,4.806-14.135,4.806C14.969,51.213,4.489,40.732,4.489,27.851z M45.282,43.352l-32.933-32.93 c4.13-3.678,9.551-5.934,15.503-5.934c12.881,0,23.362,10.48,23.362,23.363C51.213,33.803,48.958,39.225,45.282,43.352z"></path> </g> </g></svg>';
        }

        if (domCell.className == "cell ship hit") {
          domCell.innerHTML =
            '<svg fill="#ffffff" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>bomb-explosion</title> <path d="M30.79 20.247v-1.813c-3.349-1.335-5.321-2.581-5.928-4.568-0.498-1.631 1.004-3.801 3.836-6.416-2.958 1.621-5.135 2.722-5.997 1.185-0.774-1.38 0.093-3.966 1.464-7.357h-0.976c-1.094 1.731-2.025 3.044-2.371 2.72-0.301-0.283-0.305-1.301-0.174-2.72l-2.022-0.001c-1.338 2.997-2.757 4.695-4.812 4.986-1.756 0.249-4.029-1.814-6.59-4.742 1.458 2.894 1.994 5.215 1.011 5.788-1.162 0.678-3.491-0.121-6.939-1.569v0.662c2.372 1.506 4.557 2.975 4.149 3.522-0.358 0.48-1.992 0.397-4.149 0.105v1.709c3.121 1.576 4.812 3.193 4.812 4.707 0 1.302-2.601 3.961-4.812 6.067v1.011c1.995-0.654 4.443-0.908 5.265 0.558 0.839 1.495 0.276 3.611-0.802 6.695h1.848c1.958-2.645 3.819-4.766 4.812-4.672 0.703 0.066 0.375 2.225-0.105 4.672h0.558c1.743-4.845 3.892-7.814 7.078-7.706 2.796 0.096 5.449 2.91 8.368 4.916-1.526-1.867-4.337-4.526-3.731-5.021 0.637-0.521 3.367 0.432 6.207 1.464v-0.907c-1.863-1.271-3.576-2.492-3.138-2.929 0.394-0.393 1.596-0.456 3.138-0.349zM21.948 18.081c-0.335 0.334 1.759 1.577 2.956 2.438-1.81-0.632-4.092-1.582-4.518-1.234-0.308 0.252 1.12 1.603 1.897 2.553-1.485-1.021-2.845-2.448-4.267-2.496-2.092-0.071-3.29 2.442-4.323 6.282 0.272-1.823 1.089-4.679 0.502-4.733-0.833-0.078-2.846 2.892-4.351 5.106 1.051-3.185 2.006-5 1.367-6.139-0.577-1.029-2.744-0.403-3.682 0.143 1.105-1.043 3.447-3.141 3.447-4.025 0-1.286-2.32-2.733-6.599-3.951 2.572 0.405 5.888 1.149 6.275 0.631 0.303-0.405-2.192-1.813-3.71-2.811 2.672 1.146 4.365 1.92 5.122 1.479 0.5-0.292 0.222-1.47-0.52-2.942 1.303 1.489 2.471 2.538 3.364 2.411 1.884-0.267 2.698-2.76 4.166-7.518l0 0c-0.345 2.648-1.044 5.965-0.614 6.369 0.322 0.303 1.636-2.144 2.65-3.701-1.144 2.886-2.245 5.056-1.69 6.045 0.439 0.782 1.552 0.23 3.056-0.594-1.44 1.33-2.214 2.433-1.961 3.263 0.503 1.647 2.857 2.292 7.065 3.766-2.161-0.28-5.135-0.842-5.634-0.344z"></path> </g></svg>';
        }
        playerTwoCells.appendChild(domCell);
      }
    }
  }

  setNames(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  clearScreen() {
    const main = document.querySelector("main");
    main.innerHTML = "";
  }
}
