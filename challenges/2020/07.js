const getBagName = (str) => {
  const descriptionEnd = str.indexOf(' bag');
  return str.slice(0, descriptionEnd);
};

const getSmallerBags = (str) => {
  const bags = [];
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) > 0 && Number(str[i]) <= 9) {
      bags.push([str[i], getBagName(str.slice(i + 2))]);
    }
  }
  return bags;
};

const createBagRules = (rules) => {
  const bagRules = {};

  for (let rule of rules) {
    const ruleName = getBagName(rule);
    const smallerBags = getSmallerBags(rule);
    bagRules[ruleName] = smallerBags;
  }

  return bagRules;
};

const solvePuzzle = (input) => {
  input = input.split('\n');
  const bagRules = createBagRules(input);
  let count = 0;

  const findBags = (smallerBags, multiplier = 1) => {
    count += multiplier;

    for (let [bagCount, bagName] of smallerBags) {
      findBags(bagRules[bagName], multiplier * bagCount);
    }
  };

  findBags(bagRules['shiny gold']);

  return count - 1;
};

const solvePuzzlePart1 = (input) => {
  input = input.split('\n');
  const bagRules = createBagRules(input);
  let count = 0;

  const findBags = (smallerBags) => {
    let found = false;
    if (smallerBags.some(([_, bagName]) => bagName === 'shiny gold')) {
      count += 1;
      found = true;
    } else {
      for (let [_, bagName] of smallerBags) {
        found = found || findBags(bagRules[bagName]);
        if (found) break;
      }
    }

    return found;
  };

  for (let [largeBag, smallerBags] of Object.entries(bagRules)) {
    findBags(smallerBags);
  }

  return count;
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
