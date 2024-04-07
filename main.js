let matrix = [];
let gameActive = true;
let bombsAdded = false;
function startGame() {
  const matrixSize = 3;
  const percentOfBombs = 25;
  const bombCount = Math.floor(
    (percentOfBombs * matrixSize * matrixSize) / 100
  );
  createMatrix(matrixSize);
  addClickListener(matrix, bombCount);
  const flagsLeft = document.getElementById("flags-left");
  flagsLeft.innerHTML = ` ${bombCount}`;
}
startGame();
function gameWin() {
  result.innerHTML = "Победа! Вы остались целы!";
  revealBombs();
  gameOver();
}
function gameLose(cellDiv) {
  cellDiv.innerHTML = "💣";
  const result = document.querySelector("#result");
  result.innerHTML = "Booom!";
  document.body.style.backgroundColor = "#e3827b";
  revealBombs();
  gameOver();
}
function revealBombs() {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      if (matrix[row][col] === 1) {
        cell.innerHTML = "💣";
        cell.style.backgroundColor = "#e3827b";
        cell.style.borderColor = "#e3827b";
      }
    }
  }
}
function gameOver() {
  gameActive = false;
  const resetButton = document.createElement("button");
  resetButton.textContent = "Играть снова";
  resetButton.classList.add("continueSubmit");
  const container = document.querySelector("#container");
  container.appendChild(resetButton);
  resetButton.addEventListener("click", function () {
    resetGame();
  });
}
function resetGame() {
  document.body.style.backgroundColor = "#fff";
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  bombsAdded = false;
  result.innerHTML = "";
  const container = document.querySelector("#container");
  const resetButton = container.lastChild;
  resetButton.remove();
  gameActive = true;
  startGame();
}
function checkBombs(row, col) {
  let total = 0;
  const rowSize = matrix.length;
  const isLeftEdge = col === 0;
  const isRightEdge = col === rowSize - 1;
  if (!isLeftEdge && matrix[row][col - 1] === 1) total++;
  if (!isRightEdge && matrix[row][col + 1] === 1) total++;
  if (row > 0 && matrix[row - 1][col] === 1) total++;
  if (row < rowSize - 1 && matrix[row + 1][col] === 1) total++;
  if (!isLeftEdge && row > 0 && matrix[row - 1][col - 1] === 1) total++;
  if (!isRightEdge && row > 0 && matrix[row - 1][col + 1] === 1) total++;
  if (!isLeftEdge && row < rowSize - 1 && matrix[row + 1][col - 1] === 1)
    total++;
  if (!isRightEdge && row < rowSize - 1 && matrix[row + 1][col + 1] === 1)
    total++;
  console.log(`Количество бомб вокруг (${row}, ${col}): ${total}`);
  return total;
}
function disableCellClicks() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.onclick = null;
    cell.oncontextmenu = null;
  });
}
