const router = require("express").Router();

const runTest = require("./controller/runTest");

const challengeModel = require("../challenge/controller/challengeModel");


//all challenges page
router.get("/", async (req, res) => {
  const results = await challengeModel.get();
  // res.status(200).send({ data: results });
  res.render("challenges",{challenges: results});
});


//one challenge page before saving into the user profile
router.get("/:challengeId", async (req, res) => {
  const challengeId =  req.params.challengeId;
  const results = await challengeModel.get(challengeId);
  res.render("challenge",{challenge: results[0]});
});

//one challenge page before saving into the user profile
router.post("/:challengeId/test", async (req, res) => {
  const challengeId =  req.params.challengeId;
  const { solution } = req.body;
  const challenges = await challengeModel.get(challengeId);
  const result =  runTest(challenges[0].test, solution);
  res.status(200).send({ result });
});

router.post("/", async (req, res) => {
  const results = await challengeModel.create(req.body);
  res.status(200).send({ data: results });
});

router.delete("/:challengeId", async (req, res) => {
  const challengeId = req.params.challengeId;
  const results = await challengeModel.delete(challengeId);
  res.status(200).send({ data: results });
});
module.exports = router;
