// Part 1
const solvePuzzle1 = (input) => {
  const limits = { red: 12, green: 13, blue: 14 };

  const games = input.split('\n').map((line, idx) => {
    const rounds = line.split(': ')[1];

    return rounds
      .replaceAll(' ', '')
      .split(';')
      .map((round) => {
        const colorsAndNumbers = {
          red: 0,
          green: 0,
          blue: 0,
          gameNo: idx + 1,
        };

        round.split(',').forEach((numAndColor) => {
          const number = numAndColor.match(/^\d+/)[0];
          const color = numAndColor.slice(number.length);
          colorsAndNumbers[color] += Number(number);
        });

        return colorsAndNumbers;
      });
  });

  const legalGames = games.filter((rounds) => {
    return rounds.every((game) => game.red <= limits.red && game.green <= limits.green && game.blue <= limits.blue);
  });

  return legalGames.reduce((acc, rounds) => rounds[0].gameNo + acc, 0);
};

// Part 2
const solvePuzzle2 = (input) => {
  const games = input.split('\n').map((line, idx) => {
    const rounds = line.split(': ')[1];

    return rounds
      .replaceAll(' ', '')
      .split(';')
      .map((round) => {
        const colorsAndNumbers = {
          red: 0,
          green: 0,
          blue: 0,
          gameNo: idx + 1,
        };

        round.split(',').forEach((numAndColor) => {
          const number = numAndColor.match(/^\d+/)[0];
          const color = numAndColor.slice(number.length);
          colorsAndNumbers[color] += Number(number);
        });

        return colorsAndNumbers;
      });
  });

  const minimumRequiredBallsForGames = games.map((rounds) => {
    const rgbMinimums = [0, 0, 0];

    rounds.forEach((round) => {
      rgbMinimums[0] = Math.max(rgbMinimums[0], round.red);
      rgbMinimums[1] = Math.max(rgbMinimums[1], round.green);
      rgbMinimums[2] = Math.max(rgbMinimums[2], round.blue);
    });

    return rgbMinimums;
  });

  return minimumRequiredBallsForGames.reduce((acc, rounds) => rounds[0] * rounds[1] * rounds[2] + acc, 0);
};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
