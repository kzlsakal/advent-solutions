/**
 * Part 2
 */

const getDirectionPart2 = (waypoint, degree) => {
  const [wpEast, wpNorth] = waypoint;
  if (degree === 90 || degree === -270) {
    return [wpNorth, -wpEast];
  } else if (degree === -90 || degree === 270) {
    return [-wpNorth, wpEast];
  } else {
    return [-wpEast, -wpNorth];
  }
};

const navigatePart2 = (pos, cmd) => {
  const [x, y, waypoint] = pos;
  const [wpEast, wpNorth] = waypoint;
  const [dir, dist] = cmd;
  switch (dir) {
    case 'R':
      return [x, y, getDirectionPart2(waypoint, dist)];
    case 'L':
      return [x, y, getDirectionPart2(waypoint, -dist)];
    case 'E':
      return [x, y, [wpEast + dist, wpNorth]];
    case 'S':
      return [x, y, [wpEast, wpNorth - dist]];
    case 'W':
      return [x, y, [wpEast - dist, wpNorth]];
    case 'N':
      return [x, y, [wpEast, wpNorth + dist]];
    case 'F':
      return [x + wpEast * dist, y + wpNorth * dist, waypoint];
    default:
      return [x, y, waypoint];
  }
};

const solvePuzzle = (input) => {
  input = input.split('\n').map((c) => [c[0], Number(c.slice(1))]);

  let pos = [0, 0, [10, 1]];

  for (let cmd of input) {
    pos = navigatePart2(pos, cmd);
  }

  const [x, y] = pos;

  return Math.abs(x) + Math.abs(y);
};

/**
 * Part 1
 */

const getDirectionPart1 = (prevDir, degree, left) => {
  const directions = ['E', 'S', 'W', 'N'];
  if (left) directions.reverse();
  const currDirIdx = directions.indexOf(prevDir);
  const nextDirIdx = (currDirIdx + degree / 90) % directions.length;
  return directions[nextDirIdx];
};

const navigatePart1 = (pos, cmd) => {
  const [x, y, prevDir] = pos;
  const [dir, dist] = cmd;
  switch (dir) {
    case 'R':
      return [x, y, getDirectionPart1(prevDir, dist)];
    case 'L':
      return [x, y, getDirectionPart1(prevDir, dist, true)];
    case 'E':
      return [x + dist, y, prevDir];
    case 'S':
      return [x, y - dist, prevDir];
    case 'W':
      return [x - dist, y, prevDir];
    case 'N':
      return [x, y + dist, prevDir];
    case 'F':
      if (prevDir === 'E') return [x + dist, y, prevDir];
      if (prevDir === 'S') return [x, y - dist, prevDir];
      if (prevDir === 'W') return [x - dist, y, prevDir];
      if (prevDir === 'N') return [x, y + dist, prevDir];
    default:
      return [x, y, prevDir];
  }
};

const solvePuzzlePart1 = (input) => {
  input = input.split('\n').map((c) => [c[0], Number(c.slice(1))]);

  let pos = [0, 0, 'E'];

  for (let cmd of input) {
    pos = navigatePart1(pos, cmd);
  }

  const [x, y] = pos;

  return Math.abs(x) + Math.abs(y);
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
