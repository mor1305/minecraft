const elementsObject = {
  0: "dirt",
  1: "grass",
  2: "leaves",
  3: "stone",
  4: "wood",
  9: "sky",
};

const elementsAndToolsObject = {
  shovel: ["dirt", "grass"],
  axe: ["leaves", "wood"],
  pickaxe: ["stone"],
};

const elementsAndInventoryObject = {
  dirt: "dirt",
  grass: "grass",
  leaves: "leaves",
  stone: "stone",
  wood: "wood",
};

const myArray = [
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 2, 2, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 2, 2, 2, 2, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 2, 2, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4, 9, 9, 9],
  [9, 9, 9, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4, 9, 9, 9],
  [9, 9, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4, 9, 9, 3],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let currentTool = null;

export function drawBoard(gameBoard) {
  for (let i = 0; i < myArray.length; i++) {
    for (let j = 0; j < myArray[i].length; j++) {
      drawElement(gameBoard, myArray[i][j], i + 1, j + 1);
    }
  }
}

export function drawElement(gameBoard, elementCode, x, y) {
  const boardElement = document.createElement("div");
  boardElement.style.gridRowStart = x;
  boardElement.style.gridColumnStart = y;
  boardElement.classList.add(elementsObject[elementCode]);
  boardElement.classList.add("game-element");
  gameBoard.appendChild(boardElement);
}

export function initTools() {
  let tools = document.querySelectorAll("button");
  tools.forEach((tool) => {
    tool.addEventListener("click", chooseTool);
    tool.addEventListener("mouseover", hover);
    tool.addEventListener("mouseout", undoHover);
  });
}

function hover(event) {
  event.target.classList.add("hovered-tool");
}

function undoHover(event) {
  event.target.classList.remove("hovered-tool");
}

function chooseTool(event) {
  if (currentTool === null) {
    event.target.classList.add("selected-tool");
    currentTool = event.target;
  } else if (currentTool === event.target) {
    event.target.classList.remove("selected-tool");
    currentTool = null;
  } else {
    currentTool.classList.remove("selected-tool");
    event.target.classList.add("selected-tool");
    currentTool = event.target;
  }
}

export function initElements() {
  let elements = document.querySelectorAll(".game-element");
  elements.forEach((element) => {
    element.addEventListener("click", chooseElement);
    element.addEventListener("mouseover", hover);
    element.addEventListener("mouseout", undoHover);
  });
}

function chooseElement(event) {
  let currentElement = event.target.classList[0];
  if (currentElement !== "sky" && currentTool) {
    if (elementsAndToolsObject[currentTool.id].includes(currentElement)) {
      addElementToInventory(event.target);
    }
  } else if (currentElement === "sky" && currentTool) {
    let elementInventory = parseInt(currentTool.nextElementSibling.innerHTML);
    if (elementInventory > 0) {
      drawElementFromInventory(event.target, elementInventory);
      elementInventory--;
      currentTool.nextElementSibling.innerHTML = elementInventory;
    }
  }
}

function addElementToInventory(element) {
  let currentElementClass = element.classList[0];
  element.classList.remove(element.classList[0]);
  element.className = "sky";
  element.classList.add("game-element");
  let currentInventory = document.getElementById(currentElementClass);
  let currentInventoryValue = parseInt(
    currentInventory.nextElementSibling.innerHTML
  );
  currentInventoryValue++;
  currentInventory.nextElementSibling.innerHTML = currentInventoryValue;
}

function drawElementFromInventory(element, elementInventory) {
  element.className = currentTool.id;
  element.classList.add("game-element");
}

export function resetGame() {
  let reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
    window.location.reload();
  });
}
