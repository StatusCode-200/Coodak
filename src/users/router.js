const router = require("express").Router();
const basicAuth = require("../auth/middleware/basicAuth.js");
const bearerAuth = require("../auth/middleware/bearerAuth.js");
const aclPermission = require("../auth/middleware/acl");
const usersContoller = require("./controllers");

// router.get('/read', bearerAuth, aclPermission('read'), (req, res) => {
//     res.status(200).send('user get !! !!!! ');
//   });
//   router.post('/add', bearerAuth, aclPermission('create'), (req, res) => {
//     res.status(200).send('user-submission !!!! ');
//   });
//   router.put('/change', bearerAuth, aclPermission('update'), (req, res) => {
//     res.status(200).send('put user !!!! ');
//   });
//   router.delete('/remove', bearerAuth, aclPermission('delete'), (req, res) => {
//     res.status(200).send('DELETED !!!! ');
//   });

router.get("/", bearerAuth, aclPermission('users','list'), usersContoller.listUsers);

router.get("/secret", usersContoller.getSecret);

router.get("/:userId",bearerAuth, aclPermission('users','read'), usersContoller.getUser);

router.post("/", bearerAuth, aclPermission('users','create'), usersContoller.createUser);

router.post("/signup",usersContoller.singup);

router.post("/signin", basicAuth ,usersContoller.signin);



module.exports = router;
