// Part 1
// const solvePuzzle1 = (input) => {
//   const cave = parseInput(input);
//   const [maxX, maxY] = [cave[0].length - 1, cave.length - 1];
//   const visited = [...cave.map((l) => l.map(() => 0))];

//   let minRisk = Infinity;

//   const explore = (x, y, currentRisk) => {
//     const risk = cave[y][x] + currentRisk;
//     if (risk >= minRisk) return;
//     if (x === maxX && y === maxY) {
//       minRisk = Math.min(minRisk, risk);
//       console.log(minRisk);
//       return;
//     }

//     const visitedRight = visited[y][x + 1];
//     const visitedDown = visited[y + 1] === undefined || visited[y + 1][x];
//     const visitedLeft = visited[y][x - 1];
//     const visitedUp = visited[y - 1] === undefined || visited[y - 1][x];

//     if (x < maxX && !visitedRight) {
//       visited[y][x + 1] = 1;
//     }
//     if (y < maxY && !visitedDown) {
//       visited[y + 1][x] = 1;
//     }

//     if (x > 0 && y < maxY && !visitedLeft) {
//       visited[y][x - 1] = 1;
//     }

//     if (y > 0 && !visitedUp) {
//       visited[y - 1][x] = 1;
//     }

//     if (x < maxX && !visitedRight) {
//       explore(x + 1, y, risk);
//     }
//     if (y < maxY && !visitedDown) {
//       explore(x, y + 1, risk);
//     }

//     if (x > 0 && y < maxY && !visitedLeft) {
//       explore(x - 1, y, risk, visited);
//     }

//     if (y > 0 && !visitedUp) {
//       explore(x, y - 1, risk, visited);
//     }

//     if (x < maxX && !visitedRight) {
//       visited[y][x + 1] = 0;
//     }
//     if (y < maxY && !visitedDown) {
//       visited[y + 1][x] = 0;
//     }

//     if (x > 0 && y < maxY && !visitedLeft) {
//       visited[y][x - 1] = 0;
//     }

//     if (y > 0 && !visitedUp) {
//       visited[y - 1][x] = 0;
//     }
//   };

//   explore(0, 0, 0);

//   return minRisk;
// };

const solvePuzzle1 = (input) => {
  const cave = parseInput(input);
  const [maxX, maxY] = [cave[0].length - 1, cave.length - 1];

  let [currX, currY] = [0, 0];
  let currNode = { y: 0, x: 0, cost: 0, visited: new Set().add("0,0"), stack: [] };

  while (currX < maxX && currY < maxY) {
    const { y, x, cost, visited, stack } = currNode;
    if (x === maxX && y === maxY) console.log(cost);
    let currVisited = new Set(visited);
    currVisited.add(`${y},${x}`);

    if (x < maxX && !visited.has(`${y},${x + 1}`)) {
      stack.push({ y: y, x: x + 1, cost: cave[y][x + 1] + cost, visited: new Set(currVisited), stack: [...stack] });
    }
    if (y < maxY && !visited.has(`${y + 1},${x}`)) {
      stack.push({ y: y + 1, x: x, cost: cave[y + 1][x] + cost, visited: new Set(currVisited), stack: [...stack] });
    }
    if (x > 0 && !visited.has(`${y},${x - 1}`)) {
      stack.push({ y: y, x: x - 1, cost: cave[y][x - 1] + cost, visited: new Set(currVisited), stack: [...stack] });
    }
    if (y > 0 && !visited.has(`${y - 1},${x}`)) {
      stack.push({ y: y - 1, x: x, cost: cave[y - 1][x] + cost, visited: new Set(currVisited), stack: [...stack] });
    }

    stack.slice(-4).forEach((node) => (node.stack = node.stack.filter((n) => n !== node)));

    currNode.stack = stack.sort((a, b) => a.cost - b.cost);
    currNode = currNode.stack.pop();
  }

  return currNode;
};

// Part 2
const solvePuzzle2 = (input) => {
  input = parseInput(input);
  return input;
};

const parseInput = (input) => input.split("\n").map((l) => l.split("").map((n) => Number(n)));

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
// require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
