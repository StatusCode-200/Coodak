const router = require("express").Router();
const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");
// const checkIsSameUser = require("../auth/middleware/checkIsSameUser");
const projectsControllers = require("./controllers");

router.get("/:userId/projects",bearerAuth, aclPermission('userChallenges','read'), projectsControllers.listUserProject);

router.get("/:userId/projects/:projectId", bearerAuth, aclPermission('userChallenges','read'), projectsControllers.getUserProject);

router.post("/:userId/projects",bearerAuth, aclPermission('userChallenges','create'), projectsControllers.createUserProject);
router.put("/:userId/projects/:projectId",bearerAuth, aclPermission('userChallenges','update'), projectsControllers.updateUserProject);

module.exports = router;
