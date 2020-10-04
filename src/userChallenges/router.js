const router = require("express").Router();

const userChallengesController = require("./controllers");

router.get("/:userId/userchallenges", userChallengesController.listUserChallenges);
//render saved challenge in challenge page
router.get("/:userId/userchallenges/:challengeId",userChallengesController.getUserChallenge);

router.post("/:userId/userchallenges", userChallengesController.createUserChallenge);

router.delete("/:userId/userchallenges/:challenge_id", userChallengesController.deleteUserChallenge);

module.exports = router;
