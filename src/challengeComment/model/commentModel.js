const commentSchema = require("../model/commentSchema");

class ChallengeComment {
  constructor() {
    this.schema = commentSchema;
  }
  // async get(_id) {
  //   return  await _id ? this.schema.find({_id:_id}) :this.schema.find();
  // }

  async getByChallengeId(challengeId) {
    return  await this.schema.find({challenge_id : challengeId}).populate("user_id").exec();
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(_id, record){
    return this.schema.findOneAndUpdate({_id},record, { new: true });
  }

  // patch(_id, record){
  //   return this.schema.findOneAndUpdate({_id},record, { new: true });
  // }

  delete(_id){
    return this.schema.deleteOne({_id:_id});
  }
}


module.exports = new ChallengeComment();
