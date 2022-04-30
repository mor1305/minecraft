import { drawBoard, initTools, initElements, resetGame } from "./minecraft.js";

const gameBoard = document.getElementById("game-board");

function draw() {
  drawBoard(gameBoard);
}

function main() {
  draw();
  initTools();
  initElements();
  resetGame();
}

// window.requestAnimationFrame(main);

main();
