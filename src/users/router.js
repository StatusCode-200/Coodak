const router = require("express").Router();

const User = require("./controllers/userModel");

router.get("/", async (req, res) => {
  const results = await User.get();
  res.status(200).send({ data: results });
});

router.post("/", async (req, res) => {
  const results = await User.create(req.body);
  res.status(200).send({ data: results });
});

router.post("/signup",signupHandler);

async function signupHandler(req, res, next) {
  const username = req.body.usrename;
  let isUserExist = await User.get(username);
  if (isUserExist.length > 0) { // to check if the user is already exist and signup 
    res.status(403).send('user is already exist');
    return;
  }
  Users.create(req.body).then(async(user) => {
    const token = await Users.generateToken(user);
    res.status(200).json({ token });
  })
    .catch((err) => {
      console.log('Wrong!!');
      res.status(403).send(err.message);
    });
}


// app.post('/signin', basicAuth ,signinHandler);



module.exports = router;
