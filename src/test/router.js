const { spawn } = require("child_process");

const router = require("express").Router();

router.get("/" , (req, res) => {
  // mkdir testDir
  // cp testFile.test.js to testDir
  // write inputFile.js to testDir

  let stdout  = "";
  let stderr  = "";

  // const child = spawn('node', ['whichTests'], { env: { testDir: "testDir" } });
  const child = spawn("mocha", ["src/test/testDir"]);

  child.stdout.on("data", (data) => {
    stdout+= data;
  });

  child.stderr.on("data", (data) => {
    stderr += data;
  });

  // prcoess ended
  child.on("exit", code => {
    res.status(200).send({ exitCode: code, stdout, stderr });
  });

  child.on("error", (err) => {
    res.status(500).send({ msg: err.message });
  });

});

module.exports = router;
