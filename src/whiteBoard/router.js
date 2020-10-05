const router = require("express").Router();
const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");

const whiteBoardController = require("./controllers");

router.get("/",bearerAuth, aclPermission('users','read'), whiteBoardController.listWhiteBoardChallenge);
//render saved whiteboard in whiteboard page
router.get("/:user_challenge_id",bearerAuth, aclPermission('userChallenges','read'), whiteBoardController.getWhiteBoardChallenge);

router.post("/:user_challenge_id",bearerAuth, aclPermission('userChallenges','create'), whiteBoardController.createWhiteBoardChallenge);

router.put("/:user_challenge_id",bearerAuth, aclPermission('userChallenges','update'), whiteBoardController.updateWhiteBoardChallenge);

router.delete("/:user_challenge_id",bearerAuth, aclPermission('userChallenges','delete'), whiteBoardController.deleteWhiteBoardChallenge);

module.exports = router;
