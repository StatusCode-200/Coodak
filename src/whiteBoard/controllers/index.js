const whiteBoardModel = require("../model/whiteboardModel");


//get saved whiteboard by the saved userchallenge id
exports.getUserWhiteBoard = async (req, res) => {
  const savedChallengeId =  req.params.savedChallengeId;
  const results = await whiteBoardModel.getBySavedChallengeId(savedChallengeId);
  res.render("whiteboard",{ whiteboard: results, savedChallengeId : savedChallengeId });
};

exports.createUserWhiteBoard = async (req, res) => {
  console.log(req.body,"111111111111111111111111111111111");
  console.log(req.params.savedChallengeId,"111111111111111111111111")
    console.log("user", req.user.validUser);
    const results = await commentModel.create(Object.assign(req.body,{ user_challenge_id:req.params.savedChallengeId}));
    res.status(200).send({ data: results });//shoud not reload or change the page//go do DOM
};

/////////////////////////////////////
//update whiteboard by whiteboard id
exports.updateWhiteBoard = async (req, res) => {
  const results = await commentModel.update(req.params.whiteboardId, req.body);
  res.status(200).send({ data: results });
};

exports.deleteWhiteBoard = async (req, res) => {
  const whiteboardId = req.params.whiteboardId;
  const results = await commentModel.delete(whiteboardId);
  res.status(200).send({ data: results });
};

