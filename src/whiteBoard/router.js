const router = require("express").Router();

const whiteBoardController = require("./controllers");

router.get("/", whiteBoardController.listWhiteBoardChallenge);
//render saved whiteboard in whiteboard page
router.get("/:user_challenge_id",whiteBoardController.getWhiteBoardChallenge);

router.post("/:user_challenge_id", whiteBoardController.createWhiteBoardChallenge);

router.put("/:user_challenge_id",whiteBoardController.updateWhiteBoardChallenge);

router.delete("/:user_challenge_id", whiteBoardController.deleteWhiteBoardChallenge);

module.exports = router;
