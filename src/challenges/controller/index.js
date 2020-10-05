const challengeModel = require("../model/challengeModel");

const runTest = require("./runTest");

exports.listChallenges = async (req, res) => {
  const results = await challengeModel.get();
  res.render("challenges",{challenges: results});
};

exports.getChallenge = async (req, res) => {
  const challengeId =  req.params.challengeId;
  const results = await challengeModel.get(challengeId);
  res.render("challenge",{ challenge: results[0], solution: null });
};

exports.createChallenge = async (req, res) => {
  const results = await challengeModel.create(req.body);
  res.status(200).send({ data: results });
};

exports.deleteChallnge = async (req, res) => {
  const challengeId = req.params.challengeId;
  const results = await challengeModel.delete(challengeId);
  res.status(200).send({ data: results });
};

exports.testChallenge = async (req, res) => {
  const challengeId =  req.params.challengeId;
  const { solution } = req.body;
  const challenges = await challengeModel.get(challengeId);
  runTest(challenges[0].test, solution).then((result) => {
    res.status(200).send({ result });
  }).catch((err) => {
    console.log("errInTest", err.message);
    res.status(500).send({ msg: err.message });
  });
};
