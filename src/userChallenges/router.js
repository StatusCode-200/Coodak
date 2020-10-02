const router = require("express").Router();

const userChallenges = require("./controllers/userChallenges.js");

router.get("/:userId/userchallenges", async (req, res) => {
  const userId =  req.params.userId;
  const results = await userChallenges.get(userId);
  res.status(200).send({ data: results });
});

router.post("/:userId/userchallenges", async (req, res) => {
  const results = await userChallenges.create(req.body);
  res.status(200).send({ data: results });
});

router.delete("/:userId/userchallenges/:challenge_id", async (req, res) => {
  const userId = req.params.userId;
  const challenge_id = req.params.challenge_id;
  const results = await userChallenges.delete(userId,challenge_id);
  res.status(200).send({ data: results });
});
module.exports = router;
