// Part 1
const solvePuzzle1 = (input) => {
  const caveStates = buildCaveStates(parseInput(input));
  const getIncrementVisitedBy = (cave, visited) => {
    if (visited) return null;
    if (cave.toLowerCase() === cave) return 1;
    return 0;
  };
  return explore("start", caveStates, getIncrementVisitedBy);
};

// Part 2
const solvePuzzle2 = (input) => {
  const caveStates = buildCaveStates(parseInput(input));
  const getIncrementVisitedBy = (cave, visitedCount, visitedSmallCave) => {
    if (visitedCount === 2 || (visitedCount === 1 && visitedSmallCave)) return null;
    if (cave.toLowerCase() === cave) return 1;
    return 0;
  };
  return explore("start", caveStates, getIncrementVisitedBy);
};

const addCaveToAdjacencies = (cave, state) => {
  if (!state) return null;
  cave !== "start" && state[0].push(cave);
  return state;
};

const buildCaveStates = (input) => {
  const caveStates = new Map();
  for (let [left, right] of input) {
    addCaveToAdjacencies(right, caveStates.get(left)) || caveStates.set(left, createCaveState(right));
    addCaveToAdjacencies(left, caveStates.get(right)) || caveStates.set(right, createCaveState(left));
  }
  return caveStates;
};

const createCaveState = (cave) => (cave !== "start" ? [[cave], 0] : [[], 0]);

const explore = (cave, caveStates, getIncrementVisitedBy, visitedSmallCave = false) => {
  if (cave === "end") return 1;

  const stateOfTheCave = caveStates.get(cave);
  const [adjacencies, visited] = stateOfTheCave;
  const incrementVisitedBy = getIncrementVisitedBy(cave, visited, visitedSmallCave);

  if (incrementVisitedBy == null) return 0;
  stateOfTheCave[1] += incrementVisitedBy;

  const pathsFound = adjacencies.reduce(
    (acc, val) => acc + explore(val, caveStates, getIncrementVisitedBy, visitedSmallCave || visited),
    0
  );
  stateOfTheCave[1] -= incrementVisitedBy;
  return pathsFound;
};

const parseInput = (input) => input.split("\n").map((l) => l.split("-"));

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
