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
    res.redirect("/signup?message=user is already exist");
    return;
  }
  User.create(req.body).then(async(user) => {
    const token = await User.generateToken(user);
    res.cookie("token", token);
    res.redirect("/signin");
  })
    .catch((err) => {
      res.redirect(`/signup?message=${err.message}`);
    });
};

exports.signin = (req, res, next) => {
  if(req.token){
    res.cookie("token", req.token);
    res.redirect("/");
  } else {
    res.redirect(`/signin?message=msg: ${req.error || "Invalid credentials"}`);
  }
};

exports.getSecret = (req, res) => {
  res.status(200).send(req.user);
};
