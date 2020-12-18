const getSum = (stack) => stack.reduce((acc, v) => acc + v);

const getProduct = (stack) => stack.reduce((acc, v) => acc * v);

const workStack = (num, stack, operator, favorAddition = false) => {
  if (operator === '+') {
    stack.push((stack.pop() || 0) + num);
  } else if (operator === '*' && favorAddition) {
    stack.push(num);
  } else {
    stack.push((stack.pop() || 0) * num);
  }
};

const evaluate = (input, reducer, favorAddition = false) => {
  input = input.split('\n').map((line) => line.replace(/\s+/g, ''));
  let sum = 0;

  const calculate = (expression, i = 0) => {
    let currOperator = '+';
    let subSum, newIdx;
    const stack = [];

    while (i < expression.length) {
      const op = expression[i];

      switch (op) {
        case '+':
          currOperator = '+';
          break;

        case '*':
          currOperator = '*';
          break;

        case '(':
          [subSum, newIdx] = calculate(expression, i + 1);
          workStack(subSum, stack, currOperator, favorAddition);
          i = newIdx;
          break;

        case ')':
          return [reducer(stack), i];

        default:
          workStack(Number(op), stack, currOperator, favorAddition);
      }
      i += 1;
    }
    return [reducer(stack)];
  };

  for (let expression of input) {
    sum += calculate(expression)[0];
  }
  return sum;
};

/**
 * Part 1
 */
const solvePuzzle = (input) => evaluate(input, getSum, false);

/**
 * Part 2
 */
const solvePuzzle2 = (input) => evaluate(input, getProduct, true);

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
