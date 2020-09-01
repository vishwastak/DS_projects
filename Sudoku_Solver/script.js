var arr = [[], [], [], [], [], [], [], [], []];
var temp = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

function initializeTemp(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      temp[i][j] = false;
    }
  }
}

function setTemp(board, temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        temp[i][j] = true;
      }
    }
  }
}

function setColor(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (temp[i][j] == true) {
        arr[i][j].style.color = "#DC3545";
      }
    }
  }
}

function resetColor() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j].style.color = "green";
    }
  }
}

var board = [[], [], [], [], [], [], [], [], []];

let button = document.getElementById("generate-sudoku");
let solve = document.getElementById("solve");

console.log(arr);
function changeBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = "";
    }
  }
}

button.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response);
    initializeTemp(temp);
    resetColor();

    board = response.board;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
  };
  xhrRequest.open("get", "https://sugoku.herokuapp.com/board?difficulty=easy");
  //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
  xhrRequest.send();
};

//to be completed by student
function isPossible(board, row, col, val) {
  //row check
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == val) return false;
  }
  //col check
  for (let i = 0; i < 9; i++) {
    if (board[i][col] == val) return false;
  }
  //sub_grid check
  var row_begin = row - (row % 3);
  var col_begin = col - (col % 3);
  for (let i = row_begin; i < row_begin + 3; i++) {
    for (let j = col_begin; j < col_begin + 3; j++) {
      if (board[i][j] == val) return false;
    }
  }
  return true;
}

//to be completed by student
function solveSudokuHelper(board) {
  let isEmpty = false;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        isEmpty = true;
        var row = i;
        var col = j;
        break;
      }
    }
    if (isEmpty) break;
  }
  if (!isEmpty) {
    return true;
  }

  for (let i = 1; i <= 9; i++) {
    if (isPossible(board, row, col, i)) {
      board[row][col] = i;

      if (solveSudokuHelper(board)) return true;

      board[row][col] = 0;
    }
  }
  return false;
}

function solveSudoku(board) {
  solveSudokuHelper(board);
  changeBoard(board);
}

solve.onclick = function () {
  solveSudoku(board);
};
