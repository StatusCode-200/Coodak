'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET || 'mysecret';
const userschema = require('./users-schema.js');
const Model = require('./mongo.js');

/*const roles ={//capabilities
  user : ['read'],
  writer : ['read','create'],
  editor : ['read','create','update'],
  admin : ['read','create','update','delete'],
};*/

  
class Users extends Model {
  constructor() {
    super(userschema);
  }

  async save(record) {
    console.log('record befor hash',record);

    let myUser = await this.get({ userName: record.username } );

    if(myUser.length === 0){
      record.password = await bcrypt.hash(record.password, 5);
      return await this.create(record);
    }
    return Promise.reject(); // ==>.catch
  }

  


  /*async authenticateBasic(user,pass) {
    const myUser = await this.get({username : user});
    const valid = await bcrypt.compare(pass, myUser[0].password);
    console.log('valid',myUser[0]);////
    return valid ? myUser[0] : Promise.reject('wrong password');///
  }

  generateToken(user) {
    const token =  jwt.sign({ username: user.username, actions: roles[user.role] }, SECRET);
    return token;
  }

  async authenticateToken(token) {
    try {
      let tokenObject = await jwt.verify(token, SECRET);
      console.log('token object---------->',tokenObject);
      let theUser = await this.get({username : tokenObject.username});
      console.log('theUser---------->',theUser);
      if (theUser[0]) {
        return Promise.resolve({
          tokenObject:tokenObject,user:theUser[0],
        });
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
  */

  
}

module.exports = new Users();