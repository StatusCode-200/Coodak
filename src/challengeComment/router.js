const router = require("express").Router();

const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");
const commentsController = require("./controller");

//post comment by the challenge id
router.get("/:challengeId/comments" ,bearerAuth,aclPermission("challengeComments", "read"), commentsController.getComments);

router.post("/:challengeId/comments",bearerAuth,aclPermission("challengeComments", "create"), commentsController.createComments);
/////////////////////
//update comment by its id
router.put("/:commentId/comments",bearerAuth,aclPermission("challengeComments", "update"),commentsController.updateComments);
//delete comment by its id
router.delete("/:commentId/comments",bearerAuth,aclPermission("challengeComments", "delete"), commentsController.deleteComments);

module.exports = router;
