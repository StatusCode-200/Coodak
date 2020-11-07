const router = require("express").Router();
const basicAuth = require("../auth/middleware/basicAuth.js");
const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");
// const checkIsSameUser = require("../auth/middleware/checkIsSameUser");
const usersContoller = require("./controllers");


router.get("/", bearerAuth, aclPermission("users","list"), usersContoller.listUsers);

router.get("/validateToken", bearerAuth, usersContoller.validateToken);

router.get("/signout",usersContoller.signout);

router.get("/:userId",bearerAuth, aclPermission("users","read"), usersContoller.getUser);

router.post("/", bearerAuth, aclPermission("users","create"), usersContoller.createUser);

router.post("/signup",usersContoller.singup);

router.post("/signin", basicAuth ,usersContoller.signin);

router.put("/:userId",bearerAuth, aclPermission("users","update"), usersContoller.updateUser);

router.delete("/:userId",bearerAuth, aclPermission("users","delete"), usersContoller.deleteUser);


module.exports = router;
