const solvePuzzlePart1 = (input) => {
  input = input.split('\n\n');

  input = input.map((pass) =>
    pass
      .replace(/(\n)+/g, ' ')
      .split(' ')
      .map((f) => f.split(':')[0])
  );

  const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let validCount = 0;

  input.forEach((pass) => {
    const valid = !required.some((field) => !pass.includes(field));

    if (valid) {
      validCount += 1;
    }
  });

  return validCount;
};

const solvePuzzle = (input) => {
  input = input.split('\n\n');

  input = input.map((pass) => {
    pass = pass
      .replace(/(\n)+/g, ' ')
      .split(' ')
      .map((f) => f.split(':'));

    const o = {};
    pass.forEach((f) => (o[f[0]] = f[1]));

    return o;
  });

  const required = {
    byr: (f) => f.length === 4 && Number(f) >= 1920 && Number(f) <= 2002,
    iyr: (f) => f.length === 4 && Number(f) >= 2010 && Number(f) <= 2020,
    eyr: (f) => f.length === 4 && Number(f) >= 2020 && Number(f) <= 2030,
    hgt: (f) => {
      if (f.length === 5 && f[3] === 'c' && f[4] === 'm') {
        return Number(f.slice(0, 3)) >= 150 && Number(f.slice(0, 3)) <= 193;
      }
      if (f.length == 4 && f[2] === 'i' && f[3] === 'n') {
        return Number(f.slice(0, 2)) >= 59 && Number(f.slice(0, 2)) <= 76;
      }
      return false;
    },
    hcl: (f) => {
      if (f.length === 7 && f[0] === '#') {
        return !f.slice(1).match(/[^a-zA-Z\d:]/);
      }
      return false;
    },
    ecl: (f) => {
      const allowed = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
      return allowed.includes(f);
    },
    pid: (f) => f.length === 9 && !isNaN(Number(f)),
  };

  let validCount = 0;

  input.forEach((pass) => {
    let valid = true;

    for (let [key, func] of Object.entries(required)) {
      if (!pass.hasOwnProperty(key)) {
        valid = false;
        return;
      }
      if (!func(pass[key])) {
        valid = false;
        return;
      }
    }

    if (valid) {
      validCount += 1;
    }
  });

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
