const commentModel = require("../model/commentModel");

exports.getComments = async (req, res) => {
  const challengeId =  req.params.challengeId;
  const results = await commentModel.getByChallengeId(challengeId);
  res.status(200).send({ data: results });
};


exports.createComments = async (req, res) => {
  const results = await commentModel.create(Object.assign({ user_id: req.user.validUser._id},{ username: req.user.validUser.username} ,req.body,{ challenge_id:req.params.challengeId}));
  res.status(200).send({ data: results });//shoud not reload or change the page//go do DOM
};


/////////////////////////////////////

exports.updateComments = async (req, res) => {
  const results = await commentModel.update(req.params.commentId, req.body);
  res.status(200).send({ data: results });
};

exports.deleteComments = async (req, res) => {
  const commentId = req.params.commentId;
  const results = await commentModel.delete(commentId);
  res.status(200).send({ data: results });
};
