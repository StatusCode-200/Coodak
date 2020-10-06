"use strict";

const base64 = require("base-64");

const users = require("../../users/model/userModel.js");
module.exports = (req, res, next) => {

  let user;
  let pass;

  let basic =  req.headers.authorization ? req.headers.authorization.split(" ") : [];
  if (basic[0] == "Basic") {
    [user, pass] = base64.decode(basic[1]).split(":");
  } else if (req.body.username && req.body.pass) {
    user = req.body.username;
    pass = req.body.pass;
  } else {
    return next("Invalid Login!! ");
  }

  users.authenticateBasic(user, pass)
    .then(valid => {
      req.user = valid;
      if (!valid) {
        return next("Wrong pass or username");
      }
      return users.generateToken(valid);
    }).then(token => {
      req.token = token;
      next();
    }).catch(err => {
      req.error = err;
      next();
    });


};
