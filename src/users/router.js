const router = require("express").Router();
const basicAuth = require("../auth/middleware/basicAuth.js");
const bearerAuth = require("../auth/middleware/bearerAuth.js");

const User = require("./controllers/userModel");

router.get("/", async (req, res) => {
  const results = await User.get();
  res.status(200).send({ data: results });
});

router.get('/secret', bearerAuth, getSecret);

router.get("/:userId", async (req, res) => {
  const results = await User.getById(req.params.userId);
  res.status(200).send({ data: results });
});

router.post("/", async (req, res) => {
  const results = await User.create(req.body);
  res.status(200).send({ data: results });
});

router.post("/signup",signupHandler);
router.post('/signin', basicAuth ,signinHandler);


async function signupHandler(req, res, next) {
  const username = req.body.username;
  let isUserExist = await User.get(username);
  if (isUserExist) { // to check if the user is already exist and signup 
    res.status(403).send('user is already exist');
    return;
  }
  User.create(req.body).then(async(user) => {
    const token = await User.generateToken(user);
    res.status(200).json({ token:token, user:user });
  })
    .catch((err) => {
      console.log('Wrong!!');
      res.status(403).send(err.message);
    });
}


function signinHandler(req, res, next) {
  try {
    res.json({ token: req.token, username: req.body.username });

  } catch (e) { res.status(403).json('Invalid credentials'); }

}

function getSecret(req, res) {
  // console.log('req.userrrrr>>',req.user);
  res.status(200).send(req.user);
}
module.exports = router;
