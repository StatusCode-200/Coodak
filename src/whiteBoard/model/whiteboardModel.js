const whiteBoardChallengeSchema = require("../model/whiteBoardSchema");

class WhiteBoard {
  constructor() {
    this.schema = whiteBoardChallengeSchema;
  }

  // async get(user_challenge_id) {
  //   return  await this.schema.find({user_challenge_id:user_challenge_id });
  // }
  async get(user_challenge_id) {
    return  await user_challenge_id ? this.schema.find({user_challenge_id:user_challenge_id}) :this.schema.find();
  }

  async getById(id) {
    return await this.schema.findOne({_id:id});
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(user_challenge_id, record){
    return this.schema.findOneAndUpdate({user_challenge_id},record, { new: true });
  }

  patch(user_challenge_id, record){
    return this.schema.findOneAndUpdate({user_challenge_id},record, { new: true });
  }

  delete(user_challenge_id){
    return this.schema.deleteOne({user_challenge_id:user_challenge_id});
  }

}


module.exports = new WhiteBoard();
