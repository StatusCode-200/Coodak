"use strict";

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const SECRET = process.env.SECRET || 'mysecret';
const userschema = require("../models/userSchema.js");

/*const roles ={//capabilities
  user : ['read'],
  writer : ['read','create'],
  editor : ['read','create','update'],
  admin : ['read','create','update','delete'],
};*/


class User {
  constructor() {
    this.schema = userschema;
  }

  async save(record) {
    console.log("record befor hash",record);

    let myUser = await this.get({ userName: record.userName } );

    if(myUser.length === 0){
      record.password = await bcrypt.hash(record.password, 5);
      return await this.create(record);
    }
    return Promise.reject(); // ==>.catch
  }



  async authenticateBasic(user,pass) {
    const myUser = await this.get({username : user});
    const valid = await bcrypt.compare(pass, myUser[0].password);
    console.log('valid',myUser[0]);////
    return valid ? myUser[0] : Promise.reject('wrong password');///
  }

  generateToken(user) {
    const token =  jwt.sign({ username: user.username, _id : user._id}, SECRET);
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

  get(userName) {
    return userName ? this.schema.find() : this.schema.find(userName) ;
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(userName, record){
    return this.schema.findOneAndUpdate({userName},record, { new: true });
  }

  // update(_id, record) {
  //   return this.schema.findByIdAndUpdate(_id, record, { new: true });
  // }

  patch(userName, record){
    return this.schema.findOneAndUpdate({userName},record, { new: true });
  }


  // patch(_id, record) {
  //   return this.schema.findByIdAndUpdate(_id, record, { new: true });
  // }

  delete(userName){
    return this.schema.deleteOne({userName:userName});
  }
  // delete(_id) {
  //   return this.schema.findByIdAndDelete(_id);
  // }

}

module.exports = new User();
