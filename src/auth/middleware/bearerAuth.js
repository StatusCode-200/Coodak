"use strict";

const Users = require("../../users/model/userModel.js");

module.exports = (req, res, next) => {


  const cookieToken = req.cookies.token ? `Bearer ${req.cookies.token}` : null;

  const token = (req.headers.authorization || cookieToken);
  // console.log("tooook",token);
  if (!token)  {

    return next("invalid Login , no Header !!");
  }

  let bearer = token.split(" ");

  //  console.log('Bareeeeeer>>',bearer);
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
