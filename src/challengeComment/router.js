const router = require("express").Router();


const commentsController = require("./controller");

//post comment by the challenge id
router.get("/:challengeId/comments", commentsController.getComments);

router.post("/:challengeId/comments", commentsController.createComments);
/////////////////////
//update comment by its id
router.put("/:commentId/comments", commentsController.updateComments);
//delete comment by its id
router.delete("/:commentId/comments", commentsController.deleteComments);

module.exports = router;
