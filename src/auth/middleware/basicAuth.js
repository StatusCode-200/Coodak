'use strict';

const base64 = require('base-64');
const users = require('../../users/controllers/userModel.js');
module.exports = (req, res, next) => {

  let basic = req.headers.authorization.split(' ');
  if (basic[0] == 'Basic') { 
    let [user, pass] = base64.decode(basic[1]).split(':');
    users.authenticateBasic(user, pass)
      .then(valid => {
        req.user = valid;
        if (!valid) {
          return next('Wrong pass or username');
        }
        return users.generateToken(valid);
      }).then(token => {
        req.token = token;
        next();
      }).catch(err => next(err));

  } else {
    next('Invalid Login!! ');
  }


};