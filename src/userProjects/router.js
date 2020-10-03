const router = require("express").Router();

const Project = require("./controllers/projects");

router.get("/:userId/projects", async (req, res) => {
  const results = await Project.get();
  res.status(200).send({ data: results });
});

router.get("/:userId/projects/:projectId", async (req, res) => {
  const results = await Project.getById(req.params.projectId);
  res.render("codeeditor",{project: results});
});

router.post("/:userId/projects", async (req, res) => {
  const results = await Project.create(req.body);
  res.status(200).send({ data: results });
});

module.exports = router;
