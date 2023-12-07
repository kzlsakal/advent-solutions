// Part 1
const solvePuzzle1 = (input) => getWinnings(input);

// Part 2
const solvePuzzle2 = (input) => getWinnings(input, true);

// Constants & helpers
const cardValues = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

const handValues = {
  five: 7,
  four: 6,
  full: 5,
  three: 4,
  two: 3,
  one: 2,
  high: 1,
};

const getWinnings = (input, swapJoker = false) => {
  const hands = input
    .split('\n')
    .map((line) => {
      const [hand, bet] = line.split(' ');
      return [getHandValues(hand, swapJoker), bet];
    })
    .sort(sortHands);

  return hands.reduce((acc, [_, bet], idx) => acc + Number(bet) * (idx + 1), 0);
};

const sortHands = (handA, handB) => {
  const [[handValueA, secondaryValuesA], betA, jCountA] = handA;
  const [[handValueB, secondaryValuesB], betB, jCountB] = handB;

  const copyOfSecondaryValuesA = secondaryValuesA.slice();
  const copyOfSecondaryValuesB = secondaryValuesB.slice();

  const diff = handValueA - handValueB;

  if (diff === 0) {
    if ((jCountA || jCountB) && jCountA !== jCountB) {
      return jCountA - jCountB;
    }

    while (getLastValue(copyOfSecondaryValuesA) === getLastValue(copyOfSecondaryValuesB)) {
      copyOfSecondaryValuesA.pop();
      copyOfSecondaryValuesB.pop();
    }

    return getLastValue(copyOfSecondaryValuesA) - getLastValue(copyOfSecondaryValuesB);
  }
  return diff;
};

const getHandValues = (hand, swapJoker) => {
  const cards = {};

  hand.split('').forEach((card) => {
    cards[card] = cards[card] ? [cards[card][0] + 1, card] : [1, card];
  });

  let values = Object.values(cards).sort((a, b) => {
    if (swapJoker && (a[1] === 'J' || b[1] === 'J')) {
      return a[1] === 'J' ? +1 : -1;
    }
    return b[0] - a[0];
  });

  const secondaryValues = hand
    .split('')
    .map((c) => (swapJoker && c === 'J' ? 0 : cardValues[c]))
    .reverse();

  let jCount;

  if (swapJoker) {
    jCount = hand.split('J').length - 1;

    if (values[0][0] + jCount >= 5) {
      values[0][0] = 5;
    } else if (values[0][0] + jCount >= 2) {
      values[0][0] = Math.min(values[0][0] + jCount, 4);
    }

    if (!(values.length === 1 && values[0][1] === 'J')) {
      values = values.filter((val) => val[1] !== 'J');
    }
  }

  return [getHandTypeValue(values), secondaryValues, jCount];
};

const getHandTypeValue = (values) => {
  if (values[0][0] === 5) return handValues.five;
  if (values[0][0] === 4) return handValues.four;
  if (values[0][0] === 3 && values[1][0] === 2) return handValues.full;
  if (values[0][0] === 3) return handValues.three;
  if (values[0][0] === 2 && values[1][0] === 2) return handValues.two;
  if (values[0][0] === 2) return handValues.one;
  return handValues.high;
};

const getLastValue = (array) => array[array.length - 1];

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
