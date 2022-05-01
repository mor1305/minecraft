import { drawBoard, initTools, initElements, resetGame } from "./minecraft.js";

const gameBoard = document.getElementById("game-board");

function main() {
  drawBoard(gameBoard);
  initTools();
  initElements();
  resetGame();
}

main();
