const router = require("express").Router();
const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");

const whiteBoardController = require("./controllers");

//render saved whiteboard in whiteboard page by the saved user challenge id
router.get("/:savedChallengeId/whiteboard",bearerAuth, aclPermission('userChallenges','read'), whiteBoardController.getUserWhiteBoard);
//post saved whiteboard in whiteboard page by the saved user challenge id
router.post("/:savedChallengeId/whiteboard",bearerAuth, aclPermission('userChallenges','create'), whiteBoardController.createUserWhiteBoard);
//update whiteboard by its id
router.put("/:whiteboardId/whiteboard",bearerAuth, aclPermission('userChallenges','update'), whiteBoardController.updateWhiteBoard);
//delete whiteboard by its id
router.delete("/:whiteboardId/whiteboard",bearerAuth, aclPermission('userChallenges','delete'), whiteBoardController.deleteWhiteBoard);

module.exports = router;
