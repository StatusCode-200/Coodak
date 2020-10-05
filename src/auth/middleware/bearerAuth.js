"use strict";

const Users = require("../../users/model/userModel.js");

module.exports = (req, res, next) => {

    const token = (req.headers.authorization ||  req.cookies.token ? "Bearer " + req.cookies.token : null);
  if (!token)  {
    
    return next("invalid Login , no Header !!");
  }

  let bearer = token.split(" ");
    console.log('Bareeeeeer>>',bearer);
  if (bearer[0] == "Bearer") {
    const token = bearer[1];
    console.log('token>>',token);

    Users.authenticateToken(token).then(validUser => {
    // console.log('validUser>>',validUser);

      req.user = { validUser, token };
      next();
    }).catch(err => next("invalid Token !"));
  } else {
    return next(" INvalid Bearer");
  }

};
