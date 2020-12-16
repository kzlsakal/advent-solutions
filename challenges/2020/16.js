const isValid = (num, rules) => rules.some(([l, h]) => num >= l && num <= h);

/**
 * Part 2
 */
const solvePuzzle = (input) => {
  input = input.split('\n\n').map((lines) => lines.split('\n'));

  let [rules, myTicket, [_, ...nearbyTickets]] = input;

  // Convert myTicket to a list of all fields
  // [123, 456, 123]
  myTicket = myTicket[1].split(',').map((n) => Number(n));

  // Convert nearbyTickets to a list of tickets with all their fields
  // [[111, 222, 333], [444, 555, 666], ...]
  nearbyTickets = nearbyTickets.map((line) =>
    line.split(',').map((n) => Number(n))
  );

  // Create a ruleName => possibleIndexes map
  const possibleIndexes = new Map();

  // Convert rules array to a ruleName => ruleRanges map
  rules = new Map(
    rules.map((r) => {
      let [ruleName, ruleRanges] = r.split(': ');

      // Add a set of possible indexes for the rule name
      possibleIndexes.set(ruleName, new Set([...Array(rules.length).keys()]));

      ruleRanges = ruleRanges
        .split(' or ')
        .map((r) => r.split('-').map((n) => Number(n)));

      return [ruleName, ruleRanges];
    })
  );

  // Create a flat array with all ranges
  const allRules = [...rules.values()].flat();

  // Delete invalid tickets that don't match any rule
  for (let i = 0; i < nearbyTickets.length; i++) {
    let ticket = nearbyTickets[i];
    for (let num of ticket) {
      if (!isValid(num, allRules)) {
        delete nearbyTickets[i];
        break;
      }
    }
  }

  // Iterate over all tickets
  for (let ticket of nearbyTickets) {
    // If the ticket was not deleted before
    if (ticket) {
      // Iterate over all fields
      for (let j = 0; j < ticket.length; j++) {
        let field = ticket[j];
        // Iterate over all rules
        for (let [rule, ranges] of rules) {
          // If the ticket's field is not valid for the range
          if (!isValid(field, ranges)) {
            // Delete the field's index from possible indexes field of the rule
            possibleIndexes.get(rule).delete(j);
          }
        }
      }
    }
  }

  // Create a possibleIndexSets list sorted by set size
  // Note: These sets will point to the same ones in possibleIndexes map
  const possibleIndexSetsBySize = [...possibleIndexes.values()].sort(
    (a, b) => a.size - b.size
  );

  // First set will have one item, second set will have 2 items vice versa.
  // We will remove the numbers that exist in the previous sets.
  possibleIndexSetsBySize.forEach((rule, idx) => {
    for (let i = idx + 1; i < possibleIndexSetsBySize.length; i++) {
      for (let match of rule) {
        possibleIndexSetsBySize[i].delete(match);
      }
    }
  });

  let total = 1;

  // Finally, iterate over the now-pruned possible indexes map.
  for (let [ruleName, idxSet] of possibleIndexes) {
    // If the ruleName contains 'departure'
    if (/departure/.test(ruleName)) {
      // Get the only possible index for the rule
      const idxInMyTicket = idxSet.values().next().value;
      // Multiply the total by the number found in the ticket with that id
      total *= myTicket[idxInMyTicket];
    }
  }

  return total;
};

/**
 * Part 1
 */
const solvePuzzlePart1 = (input) => {
  input = input.split('\n\n').map((lines) => lines.split('\n'));

  let [rules, myTicket, [_, ...nearbyTickets]] = input;

  myTicket = myTicket[1].split(',').map((n) => Number(n));

  nearbyTickets = nearbyTickets.map((line) =>
    line.split(',').map((n) => Number(n))
  );

  rules = rules
    .map((r) => {
      return r
        .split(': ')[1]
        .split(' or ')
        .map((n) => n.split('-'))
        .map(([a, b]) => [Number(a), Number(b)]);
    })
    .flat();

  let errorRate = 0;

  for (let ticket of nearbyTickets) {
    for (let field of ticket) {
      if (!isValid(field, rules)) {
        errorRate += field;
      }
    }
  }

  return errorRate;
};

// eslint-disable-next-line no-undef
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
});
