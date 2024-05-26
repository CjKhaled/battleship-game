export default class welcomeScreen {
  constructor() {
    this.screen = this.drawScreen();
  }

  // original html:
  //<div class="welcome-screen">
  //     <div class="header">
  //     <img src="assets/battleship-logo.png" alt="Battleship logo">
  // </div>
  // <div class="start-info">
  //     <form>
  //         <label for="playerNameOne" class="playerNameOne">ENTER PLAYER NAME:</label>
  //         <input type="text" id="playerNameOne" name="playerNameOne" class="playerNameOne" placeholder="BATTLESHIP COMBATANT" minlength="0" maxlength="10" required>
  //         <span class="playerNameOneError"></span>
  //         <button type="submit" class="submitNames">START GAME</button>
  //     </form>
  // </div>
  // </div>

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
    span.className = "playerNameOne";

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
  }

  drawScreen() {
    this.createElements();
  }

  getScreen() {
    return this.screen;
  }
}
