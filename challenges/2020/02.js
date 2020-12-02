const solvePuzzle = (input) => {
  input = input.split('\n');

  let validCount = 0;

  for (let i = 0; i < input.length; i++) {
    let [rule, letter, password] = input[i].split(' ');
    letter = letter[0];
    let [min, max] = rule.split('-');

    // // Find min / max
    // const matches = [...password.matchAll(letter)];
    // count = matches.length;
    // if (count >= Number(min) && count <= Number(max)) {
    //   validCount += 1;
    // }

    // Find pos1 XOR pos2
    if ((password[min - 1] === letter) ^ (password[max - 1] === letter)) {
      validCount += 1;
    }
  }

  return validCount;
};

test('Puzzle Result', (done) => {
  const fs = require('fs');
  const path = require('path');
  const currentDay = path.basename(__filename).split('.')[0];

  fs.readFile(`${__dirname}/inputs/${currentDay}.txt`, (err, input) => {
    if (err) {
      throw err;
    }
    const result = solvePuzzle(input.toString());
    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Result:', result);
    done();
  });
  //expect(result).toEqual('test');
});
