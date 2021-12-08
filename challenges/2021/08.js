// Part 1
const UNIQUE_LENGTHS = [2, 4, 3, 7];
const hasUniqueLength = (d) => UNIQUE_LENGTHS.includes(d.length);
const uniqueOutputAccumulator = (acc, [_, output]) => acc + output.filter(hasUniqueLength).length;
const solvePuzzle1 = (input) => parseInput(input).reduce(uniqueOutputAccumulator, 0);

// Part 2
const solvePuzzle2 = (input) => {
  input = parseInput(input);
  let sum = 0;

  for (const [signals, output] of input) {
    const encoded = new Map();
    let signalsWithLength5 = [];
    let signalsWithLength6 = [];

    const signalLengthAction = new Map([
      [2, (d) => encoded.set(1, d)],
      [4, (d) => encoded.set(4, d)],
      [3, (d) => encoded.set(7, d)],
      [7, (d) => encoded.set(8, d)],
      [5, (d) => signalsWithLength5.push(d)],
      [6, (d) => signalsWithLength6.push(d)],
    ]);

    signals.forEach((d) => signalLengthAction.get(d.length)(d));

    // Find 5 through one and 4
    const one = encoded.get(1);
    const four = encoded.get(4);
    // one's characters removed from 4 has one character 5 doesn't have
    const fourWithoutOnesChars = four.split("").filter((c) => !strIncludes(one, c));
    for (let signal of signalsWithLength5) {
      if (fourWithoutOnesChars.every((c) => strIncludes(signal, c))) {
        encoded.set(5, signal);
        signalsWithLength5 = signalsWithLength5.filter((s) => s !== signal);
        break;
      }
    }

    // at this point signalsWithLength5 has 3 and 2
    // find 2 since it has 2 different chars than 5
    const five = encoded.get(5);
    for (let signal of signalsWithLength5) {
      let diff = 0;
      for (let i = 0; i < signal.length; i++) {
        if (!strIncludes(five, signal[i])) {
          diff += 1;
          if (diff > 1) {
            encoded.set(2, signal);
            encoded.set(3, signalsWithLength5.filter((s) => s !== signal)[0]);
            break;
          }
        }
      }
      if (diff > 1) break;
    }

    // signalsWithLength6 now has 0, 6 and 9
    // 6 doesn't have all of the chars one has
    for (let signal of signalsWithLength6) {
      if (!strIncludes(signal, one[0]) || !strIncludes(signal, one[1])) {
        encoded.set(6, signal);
        signalsWithLength6 = signalsWithLength6.filter((s) => s !== signal);
        break;
      }
    }

    // signalsWithLength6 now has 0 and 9
    // 3 has  one character 0 doesn't have, and 9 has everything 3 has
    const three = encoded.get(3);
    const threeStr = three.split("");
    for (let signal of signalsWithLength6) {
      if (threeStr.some((c) => !strIncludes(signal, c))) {
        encoded.set(0, signal);
        encoded.set(9, signalsWithLength6.filter((s) => s !== signal)[0]);
        break;
      }
    }

    let decoded = new Map();
    for (let [key, val] of encoded) {
      decoded.set(sortStr(val), key);
    }

    const currSum = output.reduce((acc, val) => acc.concat(decoded.get(sortStr(val))), "");
    sum += Number(currSum);
  }

  return sum;
};

const parseInput = (input) => input.split("\n").map((l) => l.split(" | ").map((s) => s.split(" ")));
const sortStr = (str) => str.split("").sort().join("");
const strIncludes = (str, x) => str.indexOf(x) > -1;

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
