// Part 1
const solvePuzzle1 = (input) => {
  input = input.split("\n");
  const winningNumbers = input.shift().split(",");
  const boards = getBoards(input);

  for (const num of winningNumbers) {
    for (let bidx = 0; bidx < boards.length; bidx++) {
      const board = boards[bidx];
      markBoard(board, num);

      if (getColWon(board) || getRowWon(board)) {
        return getSumOfTheUnmarked(board) * num;
      }
    }
  }
};

// Part 2
const solvePuzzle2 = (input) => {
  input = input.split("\n");
  const winningNumbers = input.shift().split(",");
  let boards = getBoards(input);

  for (const num of winningNumbers) {
    const winningBidx = [];

    for (let bidx = 0; bidx < boards.length; bidx++) {
      const board = boards[bidx];
      markBoard(board, num);

      if (getColWon(board) || getRowWon(board)) {
        winningBidx.push(bidx);
      }
    }

    const lastBoard = boards[0];
    boards = boards.filter((_, idx) => !winningBidx.includes(idx));

    if (boards.length <= 0) {
      return getSumOfTheUnmarked(lastBoard) * num;
    }
  }
};

const getBoards = (input) => {
  const boards = [];
  let boardIdx = -1;

  input.forEach((row) => {
    if (row === "") {
      boardIdx++;
      return boards.push([]);
    }

    const nums = row.split(" ").filter((x) => x !== "");
    boards[boardIdx].push(nums);
  });

  return boards;
};

const markBoard = (board, num) => {
  board.forEach((row) => {
    row.forEach((col, nidx) => {
      if (col === num) row[nidx] = null;
    });
  });
};

const getRowWon = (board) => board.some((l) => l.every((n) => !n));

const getColWon = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (board.every((l) => !l[i])) return true;
  }
};

const getSumOfTheUnmarked = (board) => {
  let sum = 0;
  board.forEach((row) => row.forEach((col) => col && (sum += Number(col))));
  return sum;
};

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
