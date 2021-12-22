// Part 1
const solvePuzzle1 = (input) => {
  input = parseInput(input);
  const cuboids = parseCuboids(input);
  const on = new Set();

  cuboids.forEach((cuboid, idx) => {
    const [x1, x2, y1, y2, z1, z2] = cuboid;
    if (Math.max(...[x1, x2, y1, y2, z1, z2].map(Math.abs)) <= 50) {
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          for (let z = z1; z <= z2; z++) {
            if (input[idx][1] === "n") {
              on.add(`${x},${y},${z}`);
            } else {
              on.delete(`${x},${y},${z}`);
            }
          }
        }
      }
    }
  });

  return on.size;
};

const parseInput = (input) => input.split("\n");
const parseCuboids = (input) =>
  input.map((l) =>
    l
      .split(",")
      .map((c) => c.split("=")[1].split(".."))
      .flat()
      .map(Number)
  );

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
