import { drawBoard } from "./minecraft.js";

const gameBoard = document.getElementById("game-board");

function draw() {
  drawBoard(gameBoard);
}

function main() {
  draw();
}

// window.requestAnimationFrame(main);

main();
