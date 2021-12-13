// Part 1
const solvePuzzle1 = (input) => {
  let [paper, instructions] = getPaperAndInstructions(parseInput(input));

  return fold(instructions[0], paper)
    .flat()
    .reduce((acc, val) => acc + val);
};

// Part 2
const solvePuzzle2 = (input) => {
  let [paper, instructions] = getPaperAndInstructions(parseInput(input));
  instructions.forEach((ins) => (paper = fold(ins, paper)));

  return "\n" + paper.map((y) => y.reduce((acc, x) => (x ? acc + "#" : acc + " "), "")).join("\n");
};

const fold = ([dir, pos], paper) => {
  if (dir === "y") {
    const firstHalf = paper.slice(0, pos);
    const secondHalf = paper.slice(pos + 1).reverse();
    paper = [];

    while (firstHalf.length > secondHalf.length) {
      secondHalf.unshift(Array(firstHalf[0].length).fill(0));
    }
    while (firstHalf.length < secondHalf.length) {
      firstHalf.unshift(Array(firstHalf[0].length).fill(0));
    }

    for (let i = 0; i < firstHalf.length; i++) {
      paper.push([]);
      for (let j = 0; j < firstHalf[i].length; j++) {
        paper[i][j] = firstHalf[i][j] || secondHalf[i][j];
      }
    }
  } else {
    const firstHalf = Array.from({ length: paper.length }, () => []);
    const secondHalf = Array.from({ length: paper.length }, () => []);

    for (let i = 0; i < paper.length; i++) {
      for (let j = 0; j < pos; j++) {
        firstHalf[i].push(paper[i][j]);
      }
      for (let j = paper[i].length - 1; j > pos; j--) {
        secondHalf[i].push(paper[i][j]);
      }
    }

    paper = Array.from({ length: paper.length }, () => []);
    for (let i = 0; i < firstHalf.length; i++) {
      for (let j = 0; j < Math.max(firstHalf[i].length, secondHalf[i].length); j++) {
        paper[i].push(Math.max(firstHalf[i][j] || secondHalf[i][j]));
      }
    }
  }
  return paper;
};

const getPaperAndInstructions = (input) => {
  const [dots, instructions] = [[], []];
  let [maxX, maxY] = [0, 0];

  for (let line of input) {
    if (line[0] === "f") {
      const [direction, pos] = line.replace("fold along ", "").split("=");
      instructions.push([direction, Number(pos)]);
    } else {
      const [x, y] = line.split(",").map((n) => Number(n));
      dots.push([x, y]);
      [maxX, maxY] = [Math.max(maxX, x), Math.max(maxY, y)];
    }
  }

  const paper = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill(0));
  dots.forEach(([x, y]) => (paper[y][x] = 1));
  return [paper, instructions];
};

const parseInput = (input) => input.split("\n").filter((x) => x !== "");

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
