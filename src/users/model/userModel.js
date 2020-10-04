"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET || "mysecret";
const userschema = require("./userSchema.js");

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


  async authenticateBasic(user,pass) {
    const myUser = await this.get( user);
    // console.log('myUser>>',myUser);
    if (!myUser) return Promise.reject("username/password is incorrect.");//
    const valid = await bcrypt.compare(pass, myUser.password);
    // console.log('valid',valid);
    return valid ? myUser : Promise.reject("username/password is incorrect");///
  }

  generateToken(user) {
    const token =  jwt.sign({ username: user.username, _id : user._id}, SECRET);
    return token;
  }

  async authenticateToken(token) {
    try {
      let tokenObject = jwt.verify(token, SECRET);
      if (tokenObject) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }

    } catch (e) {
      return Promise.reject();
    }

  }

  get(username) {
    return username ? this.schema.findOne({username}) : this.schema.find() ;
  }

  async create(record) {
    // console.log("record befor hash",record);
    let myUser = await this.get( record.username );
    if(!myUser){
      record.password = await bcrypt.hash(record.password, 5);
      const newRecord = new this.schema(record);
      return  newRecord.save();
    }
    return Promise.reject(); // ==>.catch

  }
  getById(userId) {
    return this.schema.findOne({ _id: userId});
  }
  update(userName, record){
    return this.schema.findOneAndUpdate({userName},record, { new: true });
  }

  patch(userName, record){
    return this.schema.findOneAndUpdate({userName},record, { new: true });
  }

  delete(userName){
    return this.schema.deleteOne({userName:userName});
  }
}

module.exports = new User();
