function createMatrix(matrixSize) {
  matrix = Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => 0)
  );
  console.log(matrix);
  renderCells(matrixSize);
}
function renderCells(matrixSize) {
  matrix.forEach((row, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    const grid = document.querySelector(".grid");
    grid.appendChild(rowDiv);
    row.forEach((_, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.id = `cell-${rowIndex}-${colIndex}`;
      rowDiv.appendChild(cellDiv);
    });
  });
  setFieldSize(matrixSize);
}
function addBombs(matrix, bombCount, firstClickRow, firstClickCol) {
  let currentBombCount = bombCount;
  const matrixSize = matrix.length;
  while (currentBombCount) {
    const row = generateRandom(0, matrixSize - 1);
    const col = generateRandom(0, matrixSize - 1);
    if (row !== firstClickRow || col !== firstClickCol) {
      const matrixElement = matrix[row][col];
      if (!matrixElement) {
        matrix[row][col] = 1;
        currentBombCount--;
      }
    }
  }
}
function setFieldSize(matrixSize) {
  const root = document.documentElement;
  const fieldSize = matrixSize > 10 ? "35vw" : "27vw";
  root.style.setProperty("--fieldSize", `${fieldSize}`);
  root.style.setProperty("--matrixSize", matrixSize);
}
function generateRandom(min = 0, max = 100) {
  let difference = max - min;
  let random = Math.floor(Math.random() * difference);
  random = random + min;
  return random;
}
