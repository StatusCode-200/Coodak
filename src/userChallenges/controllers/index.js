const userChallenges = require("../model/userChallengeModel");

exports.listUserChallenges = async (req, res) => {
  const userId =  req.params.userId;
  const results = await userChallenges.get(userId);
  res.status(200).send({ data: results });
};

exports.getUserChallenge =  async (req, res) => {
  const results = await userChallenges.getById(req.params.challengeId);
  res.render("challenge",{challenge: results.challenge_id, solution: results.solution});
};

exports.createUserChallenge = async (req, res) => {
  const results = await userChallenges.create(req.body);
  res.status(200).send({ data: results });
};

exports.updateUserChallenge= async (req, res) => {
  const results = await userChallenges.update(req.params.userId,req.body);
  res.status(200).send({ data: results });
};

exports.deleteUserChallenge = async (req, res) => {
  const userId = req.params.userId;
  const challenge_id = req.params.challenge_id;
  const results = await userChallenges.delete(userId,challenge_id);
  res.status(200).send({ data: results });
};
