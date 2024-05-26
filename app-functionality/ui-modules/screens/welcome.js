export default class welcomeScreen {
  constructor() {
    this.validInput = false;
    this.playerName = "";
  }

  createElements() {
    const main = document.querySelector("main");
    const welcomeScreen = document.createElement("div");
    welcomeScreen.className = "welcome-screen";

    const header = document.createElement("div");
    header.className = "header";

    const logo = document.createElement("img");
    logo.src = "assets/battleship-logo.png";
    logo.alt = "Battleship logo";

    const startInfo = document.createElement("div");
    startInfo.className = "start-info";

    const form = document.createElement("form");

    const label = document.createElement("label");
    label.htmlFor = "playerNameOne";
    label.className = "playerNameOne";
    label.textContent = "ENTER PLAYER NAME:";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "playerNameOne";
    input.name = "playerNameOne";
    input.className = "playerNameOne";
    input.placeholder = "BATTLESHIP COMBATANT";
    input.minLength = "0";
    input.maxLength = "10";
    input.required = "true";

    const span = document.createElement("span");
    span.className = "playerNameOneError";

    const button = document.createElement("button");
    button.className = "submitNames";
    button.textContent = "START GAME";
    button.type = "submit";

    main.appendChild(welcomeScreen);
    welcomeScreen.appendChild(header);
    header.appendChild(logo);
    welcomeScreen.appendChild(startInfo);
    startInfo.appendChild(form);
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(span);
    form.appendChild(button);
  }

  drawScreen() {
    this.createElements();
    this.handleSubmit();
  }

  handleSubmit() {
    const submitButton = document.querySelector(".submitNames");
    const errorMsg = document.querySelector("span.playerNameOneError");
    const input = document.querySelector("input#playerNameOne");
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (input.validity.tooShort || input.value.length == 0) {
        errorMsg.textContent = "NAME REQUIRED";
      } else {
        errorMsg.textContent = "";
        this.validInput = true;
        this.playerName = input.value;
      }
    });
  }

  getScreen() {
    return this.screen;
  }

  moveToNextScreen() {
    return this.validInput;
  }

  getPlayer() {
    return this.playerName;
  }
}
