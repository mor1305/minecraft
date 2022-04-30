import { drawBoard, initTools, initElements } from "./minecraft.js";

const gameBoard = document.getElementById("game-board");

function draw() {
  drawBoard(gameBoard);
}

function main() {
  draw();
  initTools();
  initElements();
}

// window.requestAnimationFrame(main);

main();
