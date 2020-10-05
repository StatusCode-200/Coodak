const whiteBoardChallenges = require("../model/whiteboardModel");

exports.listWhiteBoardChallenge = async (req, res) => {
  const results = await whiteBoardChallenges.get();
  res.status(200).send({ data: results });
};

exports.getWhiteBoardChallenge =  async (req, res) => {
  const results = await whiteBoardChallenges.get(req.params.user_challenge_id);
  res.status(200).send({ data: results });
};

exports.createWhiteBoardChallenge = async (req, res) => {
  const user_challenge_id = req.params.user_challenge_id;
  const results = await whiteBoardChallenges.create(Object.assign({ user_challenge_id }, req.body));
  res.status(200).send({ data: results });
};

exports.updateWhiteBoardChallenge= async (req, res) => {
  const results = await whiteBoardChallenges.update(req.params.user_challenge_id,req.body);
  res.status(200).send({ data: results });
};

exports.deleteWhiteBoardChallenge = async (req, res) => {
  const user_challenge_id = req.params.user_challenge_id;
  const results = await whiteBoardChallenges.delete(user_challenge_id);
  res.status(200).send({ data: results });
};
