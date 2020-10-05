const commentModel = require("../model/commentModel");
//get all comments for one challenge by challengeId
exports.getComments = async (req, res) => {
    const challengeId =  req.params.challengeId;
    const results = await commentModel.getByChallengeId(challengeId);
    res.render("challengeComments",{ comments: results, challengeId : challengeId });
  };

exports.createComments = async (req, res) => {
  console.log(req.body,"111111111111111111111111111111111");
  console.log(req.params.challengeId,"111111111111111111111111")
    console.log("user", req.user.validUser);
    const results = await commentModel.create(Object.assign({ user_id: req.user.validUser._id} ,req.body,{ challenge_id:req.params.challengeId}));
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