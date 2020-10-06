const whiteBoardModel = require("../model/whiteboardModel");


//get saved whiteboard by the saved userchallenge id
exports.getUserWhiteBoard = async (req, res) => {
  const userChallengeId =  req.params.userChallengeId;
  const results = await whiteBoardModel.get(userChallengeId);
  res.render("whiteboard",{ whiteboard: results[0], savedChallengeId : userChallengeId });
};

exports.createUserWhiteBoard = async (req, res) => {
  const userChallengeId =  req.params.userChallengeId;
  const results = await whiteBoardModel.create(userChallengeId, Object.assign(req.body,{ user_challenge_id:req.params.userChallengeId}));
  //res.status(200).send({ data: results });//shoud not reload or change the page//go do DOM
  res.redirect(`/challenges/${req.params.savedChallengeId}/whiteboard`);

};

/////////////////////////////////////
//update whiteboard by whiteboard id
exports.updateWhiteBoard = async (req, res) => {
  const results = await whiteBoardModel.update(req.params.userChallengeId, req.body);
  //res.status(200).send({ data: results });
  res.redirect(`/challenges/${req.params.userChallengeId}/whiteboard`);
};

exports.deleteWhiteBoard = async (req, res) => {
  const userChallengeId = req.params.userChallengeId;
  const results = await whiteBoardModel.delete(userChallengeId);
  res.status(200).send({ data: results });
};
