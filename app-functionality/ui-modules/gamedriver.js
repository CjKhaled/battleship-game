import Gamecontroller from "../classes/gamecontroller.js";
import welcomeScreen from "./screens/welcome.js";
import gameScreen from "./screens/game.js";
import planScreen from "./screens/plan.js";

class Gamedriver {
  constructor() {
    this.controller = new Gamecontroller();
    this.welcomeScreen = new welcomeScreen();
    this.gameScreen = new gameScreen();
    this.planScreen = new planScreen();
  }

  updateCurrentScreen() {
    // at the start of this function, we should show the welcome screen
    this.showPlanScreen()
    // after the input at this screen is accepted, we should show the plan screen
    this.addEventListeners();
  }

  addEventListeners() {
    // const submitButton = document.querySelector(".submitNames");
    // const errorMsg = document.querySelector("span.playerNameOneError");
    // const input = document.querySelector("input#playerNameOne");
    // submitButton.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   if (input.validity.tooShort || input.value.length == 0) {
    //     errorMsg.textContent = "NAME REQUIRED";
    //   } else {
    //     errorMsg.textContent = "";
    //     this.showPlanScreen();
    //   }
    // });

    const submitPlanBoard = document.getElementById('confirm')
    submitPlanBoard.addEventListener('click', (e) => {
        // I need to set the player 1 board to the temp board made in our
        // plan object
        // figure out how to do it later
    })
    
    const playerTwoCells = [...document.querySelectorAll(".cells.two > *")];

    playerTwoCells.forEach((cell) => {
      cell.addEventListener("click", async () => {
        const playerOneResult = this.controller.playTurn(
          cell.id[0],
          cell.id[2]
        );
        const dialogue = document.querySelector('h2.dialogue-content');
        dialogue.textContent = '';
        this.textTyping(dialogue, this.controller.getPlayerOneName() + playerOneResult)
        this.gameScreen.updateBoard(this.controller.getPlayerTwoBoard().getBoard(), cell)

        await this.delay(50 * (this.controller.getPlayerOneName() + playerOneResult).length + 1000);
        
        const playerTwoResult = this.controller.playTurn();
        dialogue.textContent = '';
        this.textTyping(dialogue, this.controller.getPlayerTwoName() + playerTwoResult)
        const cellTwo = document.getElementById(this.controller.getPlayerOneBoard().getLatestAttack().coords)
        this.gameScreen.updateBoard(this.controller.getPlayerOneBoard().getBoard(), cellTwo)

        await this.delay(50 * (this.controller.getPlayerTwoName() + playerTwoResult).length + 1000);
        dialogue.textContent = '';
        this.textTyping(dialogue, 'AWAITING ORDERS...')
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

  showWelcomeScreen() {
    this.welcomeScreen.clearScreen();
    this.welcomeScreen.drawScreen();
  }

  showPlanScreen() {
    this.planScreen.clearScreen();
    this.planScreen.drawScreen();
    this.planScreen.drawTempBoard();
  }

  showGameScreen() {
    this.gameScreen.clearScreen();
    this.controller.startGame("General", false);
    this.gameScreen.setNames(
      this.controller.getPlayerOneName(),
      this.controller.getPlayerTwoName()
    );
    this.gameScreen.drawScreen();
    this.gameScreen.drawPlayerOneBoard(
      this.controller.getPlayerOneBoard().getBoard()
    );
    this.gameScreen.drawPlayerTwoBoard(
      this.controller.getPlayerTwoBoard().getBoard()
    );
  }
}

const newGame = new Gamedriver();
newGame.updateCurrentScreen();
