const whiteBoardModel = require("../model/whiteboardModel");


//get saved whiteboard by the saved userchallenge id
exports.getUserWhiteBoard = async (req, res) => {
  const userChallengeId =  req.params.userChallengeId;
  const userId = req.params.userId;
  const results = await whiteBoardModel.get(userChallengeId);
  res.status(200).send({ whiteboard: results[0], savedChallengeId : userChallengeId, userId : userId });
};

exports.createUserWhiteBoard = async (req, res) => {
  const userChallengeId =  req.params.userChallengeId;
  const userId = req.params.userId;
  const results = await whiteBoardModel.create(Object.assign(req.body,{ user_challenge_id:req.params.userChallengeId}));
  //const results = await whiteBoardModel.create(req.body);
  //res.status(200).send({ data: results });//shoud not reload or change the page//go do DOM
  // res.redirect(`/users/${userId}/challenges/${req.params.savedChallengeId}/whiteboard`);
  res.status(200).send({ whiteboard: results[0], savedChallengeId : userChallengeId, userId : userId });

};

/////////////////////////////////////
//update whiteboard by whiteboard id
exports.updateWhiteBoard = async (req, res) => {
  const userChallengeId =  req.params.userChallengeId;
  const userId = req.params.userId;
  // eslint-disable-next-line
  const results = await whiteBoardModel.update(req.params.userChallengeId, req.body);
  res.status(200).send({ whiteboard: results[0], savedChallengeId : userChallengeId, userId : userId });
  // res.redirect(`/users/${userId}/challenges/${req.params.userChallengeId}/whiteboard`);
};

exports.deleteWhiteBoard = async (req, res) => {
  const userChallengeId = req.params.userChallengeId;
  const results = await whiteBoardModel.delete(userChallengeId);
  res.status(200).send({ data: results });
};
