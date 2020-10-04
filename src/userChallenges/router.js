const router = require("express").Router();

const userChallengesController = require("./controllers");

router.get("/:userId/challenges", userChallengesController.listUserChallenges);
//render saved challenge in challenge page
router.get("/:userId/challenges/:challengeId",userChallengesController.getUserChallenge);

router.post("/:userId/challenges", userChallengesController.createUserChallenge);

router.delete("/:userId/challenges/:challenge_id", userChallengesController.deleteUserChallenge);

module.exports = router;
