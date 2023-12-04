// Part 1
const solvePuzzle1 = (input) => {
  const lines = input.split('\n').map((line) => {
    const [winning, own] = line
      .split(': ')[1]
      .split(' | ')
      .map((nums) => nums.split(' ').filter((n) => n !== ''));

    let hit = 0;

    own.forEach((num) => {
      if (winning.includes(num)) {
        hit += 1;
      }
    });

    const cardValue = Math.pow(2, hit - 1);
    return cardValue >= 1 ? cardValue : 0;
  });
  return lines.reduce((acc, num) => acc + num, 0);
};

// Part 2
const solvePuzzle2 = (input) => {
  const cards = input.split('\n').map((line) =>
    line
      .split(': ')[1]
      .split(' | ')
      .map((nums) => nums.split(' ').filter((n) => n !== ''))
  );

  const copies = cards.map((_) => 1);

  cards.forEach(([winning, own], idx) => {
    let hit = 0;

    own.forEach((num) => {
      if (winning.includes(num)) {
        hit += 1;
      }
    });

    for (let j = 0; j < hit && idx + j + 1 < copies.length; j++) {
      copies[idx + j + 1] += copies[idx];
    }
  });

  return copies.reduce((acc, num) => acc + num, 0);
};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
