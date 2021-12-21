// Part 1
const solvePuzzle1 = (input) => {
  let [pos1, pos2] = parseInput(input);

  // die, dieCount, pos1, pos2, score1, score2
  const state = [0, 0, pos1, pos2, 0, 0];

  const roll = (player, turns = 3) => {
    while (turns--) {
      state[0] += 1;
      state[1] += 1;
      if (state[0] > 100) state[0] = 1;
      state[player + 1] += state[0];
      while (state[player + 1] > 10) state[player + 1] -= 10;
    }
  };

  while (true) {
    roll(1);
    state[4] += state[2];
    if (state[4] >= 1000) return state[1] * state[5];

    roll(2);
    state[5] += state[3];
    if (state[5] >= 1000) return state[1] * state[4];
  }
};

// Part 2
const solvePuzzle2 = (input) => {
  const [pos1, pos2] = parseInput(input);
  return Math.max(...play(pos1, 0, pos2, 0, new Map()));
};

const play = (pos1, score1, pos2, score2, memo) => {
  const memoizedResult = memo.get(`${pos1},${score1},${pos2},${score2}`);

  if (memoizedResult) return memoizedResult;
  if (score1 >= 21) return [1, 0];
  if (score2 >= 21) return [0, 1];

  let [p1Wins, p2Wins] = [0, 0];

  for (let d1 of [1, 2, 3]) {
    for (let d2 of [1, 2, 3]) {
      for (let d3 of [1, 2, 3]) {
        let pos1Next = pos1 + d1 + d2 + d3;
        while (pos1Next > 10) pos1Next -= 10;

        const [p2WinsNext, p1WinsNext] = play(pos2, score2, pos1Next, score1 + pos1Next, memo);
        p1Wins += p1WinsNext;
        p2Wins += p2WinsNext;
      }
    }
  }
  memo.set(`${pos1},${score1},${pos2},${score2}`, [p1Wins, p2Wins]);
  return [p1Wins, p2Wins];
};

const parseInput = (input) => input.split("\n").map((n) => Number(n[n.length - 1]));

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
