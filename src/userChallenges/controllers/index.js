const userChallenges = require("../model/userChallengeModel");

exports.listUserChallenges = async (req, res) => {
  const userId =  req.params.userId;
  const results = await userChallenges.get(userId);
  res.status(200).send({ data: results });
};

exports.getUserChallenge =  async (req, res) => {
  const results = await userChallenges.getById(req.params.challengeId);//challengeId for the saved challenge
  res.render("challenge",{challenge: results.challenge_id, solution: results.solution, savedChallengeId:req.params.challengeId, userId:req.user.validUser._id});
  //challenge : the original challenge because results.challenge_id (populated)     //solution: for the saved one
};

exports.createUserChallenge = async (req, res) => {
  const results = await userChallenges.create(Object.assign({user_id: req.params.userId}, req.body));
  res.redirect("/profile");
  // res.status(200).send({ data: results });
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
