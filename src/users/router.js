const router = require("express").Router();
const basicAuth = require("../auth/middleware/basicAuth.js");
const bearerAuth = require("../auth/middleware/bearerAuth.js");

const usersContoller = require("./controllers");

router.get("/", usersContoller.listUsers);

router.get("/secret", bearerAuth, usersContoller.getSecret);

router.get("/:userId", usersContoller.getUser);

router.post("/", usersContoller.createUser);

router.post("/signup",usersContoller.singup);

router.post("/signin", basicAuth ,usersContoller.signin);

module.exports = router;
