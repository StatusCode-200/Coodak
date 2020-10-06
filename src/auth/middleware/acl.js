'use strict';
const users = require('../../users/model/userModel');
module.exports = (resource ,action) => {
  return (req, res, next) => {
    // console.log('=====>>>>>>',req.user.validUser);

    try {
      if (users.rolesUsers(req.user.validUser.role, resource , action)) {
        next();
      } else {
        res.send('Access Denied! ');
      }
    } catch (e) {
      console.log('invalid Catch', e.message);
      next('Invalid!');
    }
  };
};