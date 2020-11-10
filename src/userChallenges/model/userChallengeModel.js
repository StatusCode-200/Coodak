const userChallengeShema = require("../model/userChallengeSchema.js");

class UserChallenge {
  constructor() {
    this.schema = userChallengeShema;
  }

  async get(user_id, challengeId) {

    return  await challengeId ?
      this.schema.find({ user_id:user_id, challenge_id: challengeId }).populate("challenge_id").exec()
      :
      this.schema.find({ user_id:user_id }).populate("challenge_id").exec();
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(user_id, challenge_id, record){
    return this.schema.findOneAndUpdate({ user_id, challenge_id }, record);
  }

  // patch(user_id, record){
  //   return this.schema.findOneAndUpdate({user_id},record, { new: true });
  // }

  delete(user_id,challenge_id){
    return this.schema.deleteOne({user_id:user_id,challenge_id:challenge_id});
  }

}


module.exports = new UserChallenge();
