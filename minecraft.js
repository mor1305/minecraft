const elementsObject = {
  0: "dirt",
  1: "grass",
  2: "leaves",
  3: "stone",
  4: "wood",
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
let currentElement = null;

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

let tools = document.querySelectorAll("button");
export function initTools() {
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
  console.log(currentTool);
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
  if (currentElement === null) {
    let currentElementClass = event.target.classList[0];
    console.log(currentElementClass);
    event.target.classList.remove(event.target.classList[0]);
    let currentInventory = document.getElementById(currentElementClass);
    let currentInventoryValue = currentInventory.nextElementSibling.innerHTML;
    let parsedValue = parseInt(currentInventoryValue);
    parsedValue++;
    currentInventory.nextElementSibling.innerHTML = parsedValue;
    console.log(typeof parsedValue);
  }
}
