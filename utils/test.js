module.exports = {
  test(fileName, dirName, solvePuzzle) {
    // eslint-disable-next-line no-undef
    test("Puzzle Result", (done) => {
      const fs = require("fs");
      const path = require("path");
      const currentDay = path.basename(fileName).split(".")[0];

      fs.readFile(`${dirName}/inputs/${currentDay}.txt`, (err, input) => {
        if (err) {
          throw err;
        }
        const result = solvePuzzle(input.toString());
        console.log("\x1b[1m\x1b[31m%s\x1b[0m", "Result:", result);
        done();
      });
    });
  },
};
