let lampClicks = 0;
let genieIsVisible = false;

const startOverlay = document.querySelector("#startOverlay");
const startButton = document.querySelector("#startButton");
const hintText = document.querySelector("#hintText");
const clickCounter = document.querySelector("#clickCounter");
const wishPanel = document.querySelector("#wishPanel");
const resetButton = document.querySelector("#resetButton");

const sky = document.querySelector("#sky");
const scene = document.querySelector("#scene");
const platform = document.querySelector("#platform");
const platformBorders = document.querySelectorAll(".platform-border");
const player = document.querySelector("#player");

const lamp = document.querySelector("#lamp");
const lampAura = document.querySelector("#lampAura");
const lampLight = document.querySelector("#lampLight");
const genie = document.querySelector("#genie");

const worldTitle = document.querySelector("#worldTitle");
const worldInstruction = document.querySelector("#worldInstruction");

const baseWorldObjects = document.querySelectorAll(".base-world");
const moneyWorldObjects = document.querySelectorAll(".money-world");
const loveWorldObjects = document.querySelectorAll(".love-world");
const adventureWorldObjects = document.querySelectorAll(".adventure-world");

function setVisible(elements, value) {
  elements.forEach(function (element) {
    element.setAttribute("visible", value);
  });
}

startButton.addEventListener("click", function () {
  startOverlay.style.display = "none";
  resetButton.style.display = "block";

  hintText.innerText =
    "Je bent binnengetreden in de AR wereld. Loop met WASD en zoek de magische lamp.";
});

lamp.addEventListener("click", function () {
  if (genieIsVisible === true) {
    return;
  }

  lampClicks++;
  updateLampCounter();

  if (lampClicks === 1) {
    hintText.innerText =
      "De lamp begint te gloeien... klik nog 2 keer.";

    lampAura.setAttribute("color", "#FFD166");

    lampLight.setAttribute(
      "light",
      "type: point; intensity: 2.2; distance: 10; color: #FFD166"
    );
  }

  if (lampClicks === 2) {
    hintText.innerText =
      "De magie wordt sterker... nog 1 klik en de Genie verschijnt.";

    lampAura.setAttribute("color", "#E0AAFF");

    lampLight.setAttribute(
      "light",
      "type: point; intensity: 3; distance: 12; color: #E0AAFF"
    );
  }

  if (lampClicks === 3) {
    summonGenie();
  }
});

function updateLampCounter() {
  clickCounter.innerText = "Lamp magie: " + lampClicks + " / 3";
}

function summonGenie() {
  genieIsVisible = true;

  genie.setAttribute("visible", true);
  genie.setAttribute("position", "0 1.8 -5");
  genie.setAttribute("rotation", "0 0 0");
  genie.setAttribute("scale", "0.25 0.25 0.25");

  genie.setAttribute(
    "animation",
    "property: position; to: 0 1.88 -5; dir: alternate; dur: 2200; loop: true"
  );

  lampAura.setAttribute("color", "#80FFDB");

  lampAura.setAttribute(
    "animation",
    "property: scale; to: 1.8 1.8 1.8; dir: alternate; dur: 900; loop: true"
  );

  lampLight.setAttribute(
    "light",
    "type: point; intensity: 4; distance: 14; color: #80FFDB"
  );

  worldInstruction.setAttribute(
    "value",
    "De Genie is verschenen. Kies jouw wens om een nieuwe wereld te openen."
  );

  hintText.innerText =
    "De Genie spreekt: kies wijs, want jouw wens verandert deze wereld.";

  wishPanel.style.display = "block";
}

function hideAllWishWorlds() {
  setVisible(moneyWorldObjects, false);
  setVisible(loveWorldObjects, false);
  setVisible(adventureWorldObjects, false);
}

function hideBaseWorldObjects() {
  setVisible(baseWorldObjects, false);

  lamp.setAttribute("visible", false);
  lampAura.setAttribute("visible", false);
}

function chooseWish(wish) {
  wishPanel.style.display = "none";

  hideBaseWorldObjects();

  setVisible(platformBorders, false);

  genie.setAttribute("visible", false);

  hideAllWishWorlds();

  if (wish === "money") {
    openMoneyWorld();
  }

  if (wish === "love") {
    openLoveWorld();
  }

  if (wish === "adventure") {
    openAdventureWorld();
  }
}

window.chooseWish = chooseWish;

function openMoneyWorld() {
  sky.setAttribute("src", "#richSky");

  scene.setAttribute(
    "fog",
    "type: exponential; color: #dfd7cd; density: 0.01"
  );

  platform.setAttribute("color", "#ece8e0");

  worldTitle.setAttribute("value", "Wereld van Rijkdom");
  worldTitle.setAttribute("color", "#FFF3B0");

  worldInstruction.setAttribute(
    "value",
    "Goud, schatten en luxe verschijnen om je heen."
  );

  lampLight.setAttribute("position", "0 5 -12");

  lampLight.setAttribute(
    "light",
    "type: point; intensity: 0.9; distance: 18; color: #FFD166"
  );

  setVisible(moneyWorldObjects, true);

  player.setAttribute("position", "0 1.6 -10.5");

  hintText.innerText =
    "Je koos voor rijkdom. Je staat nu in het paleis tussen munten, goudstaven en schatkisten.";
}

function openLoveWorld() {
  sky.removeAttribute("src");
  sky.setAttribute("color", "#8A0F49");

  scene.setAttribute(
    "fog",
    "type: exponential; color: #8A0F49; density: 0.025"
  );

  platform.setAttribute("color", "#C9184A");

  worldTitle.setAttribute("value", "Wereld van Liefde");
  worldTitle.setAttribute("color", "#FFE5EC");

  worldInstruction.setAttribute(
    "value",
    "Een warme wereld vol hartjes, rozen en zachte magie."
  );

  lampLight.setAttribute("position", "0 3 -5");

  lampLight.setAttribute(
    "light",
    "type: point; intensity: 3.2; distance: 15; color: #FFB3C6"
  );

  setVisible(loveWorldObjects, true);

  player.setAttribute("position", "0 1.6 8");

  hintText.innerText =
    "Je koos voor liefde. Loop rond tussen rozen, kaarsen en hartobjecten.";
}

function openAdventureWorld() {
  sky.removeAttribute("src");
  sky.setAttribute("color", "#023E8A");

  scene.setAttribute(
    "fog",
    "type: exponential; color: #023E8A; density: 0.025"
  );

  platform.setAttribute("color", "#0077B6");

  worldTitle.setAttribute("value", "Wereld van Avontuur");
  worldTitle.setAttribute("color", "#CAF0F8");

  worldInstruction.setAttribute(
    "value",
    "Voor je ligt een reis naar het onbekende."
  );

  lampLight.setAttribute("position", "0 3 -5");

  lampLight.setAttribute(
    "light",
    "type: point; intensity: 3; distance: 16; color: #90E0EF"
  );

  setVisible(adventureWorldObjects, true);

  player.setAttribute("position", "0 1.6 8");

  hintText.innerText =
    "Je koos voor avontuur. Loop rond door de jungle, langs de tempel en het schip.";
}

resetButton.addEventListener("click", function () {
  resetWorld();
});

function resetWorld() {
  lampClicks = 0;
  genieIsVisible = false;

  updateLampCounter();

  wishPanel.style.display = "none";

  sky.removeAttribute("src");
  sky.setAttribute("color", "#23004D");

  scene.setAttribute(
    "fog",
    "type: exponential; color: #16002E; density: 0.035"
  );

  platform.setAttribute("color", "#4B168C");

  setVisible(platformBorders, true);

  player.setAttribute("position", "0 1.6 8");

  setVisible(baseWorldObjects, true);
  hideAllWishWorlds();

  lamp.setAttribute("visible", true);

  lampAura.setAttribute("visible", true);
  lampAura.setAttribute("color", "#FFD166");

  lampAura.setAttribute(
    "animation",
    "property: scale; to: 1.25 1.25 1.25; dir: alternate; dur: 1200; loop: true"
  );

  lampLight.setAttribute("position", "0 2 -5");

  lampLight.setAttribute(
    "light",
    "type: point; intensity: 1.6; distance: 12; color: #FFD166"
  );

  genie.setAttribute("visible", false);
  genie.setAttribute("position", "0 1.8 -5");
  genie.setAttribute("rotation", "0 0 0");
  genie.setAttribute("scale", "0.25 0.25 0.25");

  genie.setAttribute(
    "animation",
    "property: position; to: 0 1.88 -5; dir: alternate; dur: 2200; loop: true"
  );

  worldTitle.setAttribute("value", "Genie's Wish Portal");
  worldTitle.setAttribute("color", "#FFFFFF");

  worldInstruction.setAttribute(
    "value",
    "Vind de lamp en klik drie keer om de Genie te roepen"
  );

  hintText.innerText =
    "De wereld is gereset. Zoek opnieuw de magische lamp en klik drie keer.";
}