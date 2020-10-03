const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function runTest(test, solution) {
  return new Promise((resolve, reject) => {


    // mkdir testDir
    // cp testFile.test.js to testDir
    // write inputFile.js to testDir

    const testFile = test || `const arr = require("./inputFile");

    var { expect } = require("chai");

    describe("test", function () {
      it("must be 3", function (done) {
        expect(arr.length).to.equal(3);
        done();
      });
    });
  `;

    const inputFile = solution || `// add you code here
  /*
  code
   */
  const arr = [1, 2 , 3];

  module.exports = arr;
  `;


    const randomTestNumber = Date.now() + Math.random() * 1000;
    const dirPath = path.join("..", "..", "..", "tests", `${randomTestNumber}`);

    fs.mkdir(dirPath, () => {
      fs.writeFile(`${dirPath}/testFile.test.js`, testFile, function (err) {
        if (err) return reject(new Error(err.message));
        fs.writeFile(`${dirPath}/inputFile.js`, inputFile, function (err) {
          if (err) return reject(new Error(err.message));

          let stdout  = "";
          let stderr  = "";

          // const child = spawn('node', ['whichTests'], { env: { testDir: "testDir" } });
          const child = spawn("mocha", [dirPath]);

          child.stdout.on("data", (data) => {
            stdout+= data;
          });

          child.stderr.on("data", (data) => {
            stderr += data;
          });

          // prcoess ended
          child.on("exit", code => {
            fs.rmdir(dirPath, { recursive: true },  (err) => {
              if (err) return reject(new Error(err.message));
              resolve({ exitCode: code, stdout, stderr });
            });
          });

          child.on("error", (err) => {
            fs.rmdir(dirPath, { recursive: true }, (err) => {
              if (err) return reject(new Error(err.message));
              reject(new Error(err.message));
            });
          });
        });

      });
    });
  });
}

runTest().then((result) => {
  console.log(result);
});

module.exports = runTest;
