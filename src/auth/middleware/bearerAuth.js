"use strict";

const Users = require("../../users/model/userModel.js");

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    return next("invalid Login , no Header !!");
  }

  let bearer = req.headers.authorization.split(" ");
  //   console.log('Bareeeeeer>>',bearer);
  if (bearer[0] == "Bearer") {
    const token = bearer[1];
    // console.log('token>>',token);

    Users.authenticateToken(token).then(validUser => {
    // console.log('validUser>>',validUser);

      req.user = { validUser, token };
      next();
    }).catch(err => next("invalid Token !"));
  } else {
    return next(" INvalid Bearer");
  }

};
