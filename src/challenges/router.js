const router = require("express").Router();


const challengesCtroller = require("./controller");

//all challenges page
router.get("/", challengesCtroller.listChallenges);

//one challenge page before saving into the user profile
router.get("/:challengeId", challengesCtroller.getChallenge);

//one challenge page before saving into the user profile
router.post("/:challengeId/test", challengesCtroller.testChallenge);/////send the solution in the body/////

router.post("/", challengesCtroller.createChallenge);

router.delete("/:challengeId", challengesCtroller.deleteChallnge);

module.exports = router;
