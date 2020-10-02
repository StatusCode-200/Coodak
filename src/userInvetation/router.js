const router = require("express").Router();

const Invitation = require("./controllers/invitation");

router.get("/:userId/invitation", async (req, res) => {
  const results = await Invitation.get();
  res.status(200).send({ data: results });
});

router.post("/:userId/invitation", async (req, res) => {
  const results = await Invitation.create(req.body);
  res.status(200).send({ data: results });
});

router.delete("/:userId/invitation", async (req, res) => {
  const id = req.params.userId;
  console.log('iddddddddddd',req.params);
  const results = await Invitation.delete(id);
  res.status(200).send({ data: results });
});

module.exports = router;
