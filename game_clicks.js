function addClickListener(matrix, bombCount) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", function (event) {
      if (!gameActive) return;
      const row = parseInt(event.target.id.split("-")[1]);
      const col = parseInt(event.target.id.split("-")[2]);
      if (!bombsAdded) {
        addBombs(matrix, bombCount, row, col);
        bombsAdded = true;
      }
      clickOnCell(row, col);
    });
    cell.addEventListener("contextmenu", function (event) {
      if (!gameActive) return;
      event.preventDefault();
      const row = parseInt(event.target.id.split("-")[1]);
      const col = parseInt(event.target.id.split("-")[2]);
      addFlag(row, col, bombCount);
    });
  });
}
function addFlag(row, col, bombCount) {
  const flagsLeft = document.getElementById("flags-left");
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell.innerHTML === "🚩") {
    cell.innerHTML = "";
    const newAmount = parseInt(flagsLeft.textContent) + 1;
    flagsLeft.innerHTML = ` ${newAmount}`;
  } else {
    const newAmount = parseInt(flagsLeft.textContent) - 1;
    if (newAmount >= 0) {
      cell.innerHTML = "🚩";
      flagsLeft.innerHTML = ` ${newAmount}`;
    }
    if (newAmount === 0) {
      checkWinFlagCondition();
    }
  }
}
function checkWinFlagCondition() {
  let bombFlag = true;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (
        matrix[row][col] === 1 &&
        document.getElementById(`cell-${row}-${col}`).innerHTML !== "🚩"
      ) {
        bombFlag = false;
      }
      if (
        matrix[row][col] !== 1 &&
        document.getElementById(`cell-${row}-${col}`).innerHTML === "🚩"
      ) {
        bombFlag = false;
      }
    }
  }
  if (bombFlag) {
    gameWin();
  }
}
function clickOnCell(row, col) {
  const cellDiv = document.getElementById(`cell-${row}-${col}`);
  if (matrix[row][col] === 1) {
    gameLose(cellDiv);
  } else if (checkBombs(row, col) === 0) {
    cellDiv.style.backgroundColor = "lightgrey";
  } else {
    const bombsAround = checkBombs(row, col);
    cellDiv.style.backgroundColor = "lightgrey";
    cellDiv.innerHTML = bombsAround;
    cellTextColor(cellDiv, bombsAround);
  }
}
function cellTextColor(cellDiv, bombsAround) {
  if (bombsAround === 1) {
    cellDiv.classList.add("one");
  } else if (bombsAround === 2) {
    cellDiv.classList.add("two");
  } else if (bombsAround === 3) {
    cellDiv.classList.add("three");
  } else if (bombsAround === 4) {
    cellDiv.classList.add("four");
  } else if (bombsAround === 5) {
    cellDiv.classList.add("five");
  } else if (bombsAround === 6) {
    cellDiv.classList.add("six");
  } else if (bombsAround === 7) {
    cellDiv.classList.add("seven");
  } else if (bombsAround === 8) {
    cellDiv.classList.add("eight");
  }
}
