const userChallenges = require("../model/userChallengeModel");

exports.listUserChallenges = async (req, res) => {
  const userId =  req.params.userId;
  const results = await userChallenges.get(userId);
  res.status(200).send({ data: results });
};

exports.getUserChallenge =  async (req, res) => {
  const userId =  req.params.userId;
  const results = await userChallenges.get(userId,req.params.challengeId);//challengeId for the saved challenge
  if (results[0]){
    res.status(200).send({challenge: results[0].challenge_id, solution: results[0].solution, savedChallengeId: results[0]._id });
  } else {
    res.status(200).send({ challenge: {}, solution: null });
  }
  // challenge : the original challenge because results.challenge_id (populated)     //solution: for the saved one
};

exports.createUserChallenge = async (req, res) => {
  // eslint-disable-next-line
  const results = await userChallenges.create(Object.assign({user_id: req.params.userId}, req.body));
  res.status(200).send({ data: results });
};

exports.updateUserChallenge= async (req, res) => {
  const results = await userChallenges.update(req.params.userId, req.params.challengeId,req.body);
  res.status(200).send({ data: results });
};

exports.deleteUserChallenge = async (req, res) => {
  const userId = req.params.userId;
  const challenge_id = req.params.challenge_id;
  const results = await userChallenges.delete(userId,challenge_id);
  res.status(200).send({ data: results });
};
