const solvePuzzle = (input) => {
  input = input.split('\n\n');

  input = input.map((pass) => {
    pass = pass
      .replace(/(\n)+/g, ' ')
      .split(' ')
      .map((f) => f.split(':'));

    const fields = {};
    pass.forEach((f) => (fields[f[0]] = f[1]));

    return fields;
  });

  const requirements = {
    byr: (f) => f.length === 4 && Number(f) >= 1920 && Number(f) <= 2002,
    iyr: (f) => f.length === 4 && Number(f) >= 2010 && Number(f) <= 2020,
    eyr: (f) => f.length === 4 && Number(f) >= 2020 && Number(f) <= 2030,
    hgt: (f) => {
      const unit = f.slice(-2);
      if (f.length === 5 && unit === 'cm') {
        const num = Number(f.slice(0, 3));
        return num >= 150 && num <= 193;
      }
      if (f.length == 4 && unit === 'in') {
        const num = Number(f.slice(0, 2));
        return num >= 59 && num <= 76;
      }
      return false;
    },
    hcl: (f) => {
      if (f.length === 7 && f[0] === '#') {
        return !/[^a-zA-Z\d:]/.test(f.slice(1));
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
    for (let [key, rule] of Object.entries(requirements)) {
      if (!pass.hasOwnProperty(key)) return;
      if (!rule(pass[key])) return;
    }
    validCount += 1;
  });

  return validCount;
};

const solvePuzzlePart1 = (input) => {
  input = input.split('\n\n');

  input = input.map((pass) =>
    pass
      .replace(/(\n)+/g, ' ')
      .split(' ')
      .map((field) => field.split(':')[0])
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
