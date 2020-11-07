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
  try {
    const results = await User.create(req.body);
    res.status(200).send({ data: results });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const results = await User.delete(req.params.userId);
  res.status(200).send({ data: results });
};


exports.updateUser = async (req, res) => {
  const results = await User.update(req.params.userId , req.body);
  res.status(200).send({ data: results });
};

exports.singup = async (req, res, next) => {
  const username = req.body.username;
  let isUserExist = await User.get(username);
  if (isUserExist) { // to check if the user is already exist and signup
    return res.status(409).send({ msg: "user is already exist" });
  }
  User.create(req.body)
    .then(async(user) => {
      res.redirect("/signin");
    })
    .catch((err) => {
      res.status(400).send({ msg: err.message });
    });
};

exports.signin = (req, res, next) => {
  const { user, token } = req;
  if(req.token){
    res.cookie("token", token);
    res.cookie("userId", user._id);
    res.status(200).send({ user, token });
  } else {
    res.status(401).send({ msg: req.error || "Invalid credentials" });
  }
};

exports.signout = (req, res) => {
  res.cookie("token", null);
  res.cookie("userId", null);
  res.status(200).send({ msg: "success" });
};

exports.validateToken = (req, res) => {
  res.status(200).send({ user: req.user.validUser });
};
