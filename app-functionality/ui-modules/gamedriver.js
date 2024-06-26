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
    this.playerOne = 'N/A'
  }

  updateCurrentScreen() {
    // at the start of this function, we should show the welcome screen
    this.showWelcomeScreen()
  }

  showWelcomeScreen() {
    this.welcomeScreen.clearScreen();
    this.welcomeScreen.drawScreen();
    const submitButton = document.querySelector(".submitNames");
    const errorMsg = document.querySelector("span.playerNameOneError");
    const input = document.querySelector("input#playerNameOne");
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (input.validity.tooShort || input.value.length == 0) {
        errorMsg.textContent = "NAME REQUIRED";
      } else {
        errorMsg.textContent = "";
        this.playerOne = input.value;
        this.showPlanScreen();
      }
    });
  }

  showPlanScreen() {
    this.planScreen.clearScreen();
    this.planScreen.drawScreen();
    this.planScreen.drawTempBoard();
    this.planScreen.addEventListeners();
    const submitPlanBoard = document.getElementById('confirm')
    submitPlanBoard.addEventListener('click', (e) => {
        let validSubmit = true;
        const check = [...document.querySelectorAll(".battle-ship")];
        const errorMsg = document.querySelector(".plan-error-msg");
        check.forEach((ship) => {
          if (!ship.className.includes("placed")) {
            validSubmit = false;
          }
        })

        if (validSubmit) {
          this.showGameScreen(this.planScreen.getCompleteBoard())
          errorMsg.classList.remove("active")
        } else {
          errorMsg.classList.add("active")
        }
    })
  }

  showGameScreen(board) {
    this.gameScreen.clearScreen();
    this.controller.startGame(this.playerOne, board);
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
    this.gameScreen.addEventListeners(this.controller);
  }
}

const newGame = new Gamedriver();
newGame.updateCurrentScreen();
