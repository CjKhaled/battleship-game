import Gamecontroller from "../classes/gamecontroller.js";
import welcomeScreen from "./screens/welcome.js";
import gameScreen from "./screens/game.js";

class Gamedriver {
  constructor() {
    this.controller = new Gamecontroller();
    this.welcomeScreen = new welcomeScreen();
    this.gameScreen = new gameScreen();
  }

  updateCurrentScreen() {
    // at the start of this function, we should show the welcome screen
    this.showGameScreen();
    // after the input at this screen is accepted, we should show the game screen
    this.addEventListeners();
  }

  addEventListeners() {
    // we should be listening for a valid welcome submit
    // const submitButton = document.querySelector(".submitNames");
    // const errorMsg = document.querySelector("span.playerNameOneError");
    // const input = document.querySelector("input#playerNameOne");
    // submitButton.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   if (input.validity.tooShort || input.value.length == 0) {
    //     errorMsg.textContent = "NAME REQUIRED";
    //   } else {
    //     errorMsg.textContent = "";
    //     this.showGameScreen();
    //   }
    // });

    // and board clicks
    // by default, we'll only have one player
    // so when the player finishes a turn, the computer will finish one right after
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
