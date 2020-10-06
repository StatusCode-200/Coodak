const router = require("express").Router();
const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");

const challengesCtroller = require("./controller");

//all challenges page
router.get("/",bearerAuth, aclPermission('challenges','read'), challengesCtroller.listChallenges);

router.get("/json",bearerAuth, aclPermission('challenges','read'), challengesCtroller.listChallengesJson);

//one challenge page before saving into the user profile
router.get("/:challengeId",bearerAuth, aclPermission('challenges','read'), challengesCtroller.getChallenge);

//one challenge page before saving into the user profile
router.post("/:challengeId/test",bearerAuth, aclPermission('challenges','read'), challengesCtroller.testChallenge);/////send the solution in the body/////

router.post("/",bearerAuth, aclPermission('challenges','create'), challengesCtroller.createChallenge);

router.delete("/:challengeId",bearerAuth, aclPermission('challenges','delete'), challengesCtroller.deleteChallnge);

module.exports = router;
