const router = require("express").Router();

const challengeModel = require("../challenge/controller/challengeModel");


//all challenges page
router.get("/", async (req, res) => {
  const results = await challengeModel.get();
  // res.status(200).send({ data: results });
  res.render("challenges",{challenges: results});
});


//one challenge page before saving into the user profile
router.get("/:challengeId", async (req, res) => {
  const challengeId =  req.params.challengeId;
  const results = await challengeModel.get(challengeId);
  res.render("challenge",{challenge: results[0]});
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
