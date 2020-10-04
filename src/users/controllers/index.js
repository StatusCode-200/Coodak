const User = require("../model/userModel");

exports.listUsers = async (req, res) => {
  const results = await User.get();
  res.status(200).send({ data: results });
};

exports.getUser = async (req, res) => {
  const results = await User.getById(req.params.userId);
  res.status(200).send({ data: results });
};

exports.createUser = async (req, res) => {
  const results = await User.create(req.body);
  res.status(200).send({ data: results });
};

exports.singup = async (req, res, next) => {
  const username = req.body.username;
  let isUserExist = await User.get(username);
  if (isUserExist) { // to check if the user is already exist and signup
    res.status(403).send("user is already exist");
    return;
  }
  User.create(req.body).then(async(user) => {
    const token = await User.generateToken(user);
    res.status(200).json({ token:token, user:user });
  })
    .catch((err) => {
      console.log("Wrong!!");
      res.status(403).send(err.message);
    });
};

exports.signin = (req, res, next) => {
  try {
    res.json({ token: req.token, username: req.body.username });
  } catch (e) { res.status(403).json("Invalid credentials"); }
};

exports.getSecret = (req, res) => {
  res.status(200).send(req.user);
};
