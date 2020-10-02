const router = require("express").Router();

const User = require("./controllers/userModel");

router.get("/", async (req, res) => {
  const results = await User.get();
  res.status(200).send({ data: results });
});

router.post("/", async (req, res) => {
  const results = await User.create(req.body);
  res.status(200).send({ data: results });
});

module.exports = router;
