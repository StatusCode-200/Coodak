const router = require("express").Router();
const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");
// const checkIsSameUser = require("../auth/middleware/checkIsSameUser");

const userChallengesController = require("./controllers");

router.get("/:userId/challenges",bearerAuth, aclPermission('userChallenges','read'), userChallengesController.listUserChallenges);
//render saved challenge in challenge page
router.get("/:userId/challenges/:challengeId", bearerAuth, aclPermission('userChallenges','read'),userChallengesController.getUserChallenge);//:challengeId for the saved challenge

router.post("/:userId/challenges",bearerAuth, aclPermission('userChallenges','create'), userChallengesController.createUserChallenge);

router.put("/:userId/challenges/:challengeId",bearerAuth, aclPermission('userChallenges','update'), userChallengesController.updateUserChallenge);

router.delete("/:userId/challenges/:challenge_id",bearerAuth, aclPermission('userChallenges','delete'), userChallengesController.deleteUserChallenge);

module.exports = router;
