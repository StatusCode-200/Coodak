const router = require("express").Router();

const challengeModel = require("../challenge/controller/challengeModel");

router.get(["/", "/:challengeId"], async (req, res) => {
  const challengeId =  req.params.challengeId;
  const results = await challengeModel.get(challengeId);
  res.status(200).send({ data: results });
});

router.post("/", async (req, res) => {
  const results = await challengeModel.create(req.body);
  res.status(200).send({ data: results });
});

router.delete("/:challengeId", async (req, res) => {
  const challengeId = req.params.challengeId;
  const results = await challengeModel.delete(challengeId);
  res.status(200).send({ data: results });
});
module.exports = router;
