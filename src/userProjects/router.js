const router = require("express").Router();

const projectsControllers = require("./controllers");

router.get("/:userId/projects", projectsControllers.listUserProject);

router.get("/:userId/projects/:projectId", projectsControllers.getUserProject);

router.post("/:userId/projects", projectsControllers.createUserProject);

module.exports = router;
