const userChallengeShema = require("../model/userChallengeSchema.js");

class UserChallenge {
 constructor(){
   this.schema = userChallengeShema;
 }
    async get(user_id) {
      return  await this.schema.find({user_id:user_id});   
      
    }

    async getById(id) {
      return await this.schema.findOne({_id:id}).populate("challenge_id user_id").exec();
    }

create(record) {
  const newRecord = new this.schema(record);
  return newRecord.save();
}

update(user_id, record){
  return this.schema.findOneAndUpdate({user_id},record, { new: true });
}

// update(_id, record) {
//   return this.schema.findByIdAndUpdate(_id, record, { new: true });
// }

patch(user_id, record){
  return this.schema.findOneAndUpdate({user_id},record, { new: true });
}


// patch(_id, record) {
//   return this.schema.findByIdAndUpdate(_id, record, { new: true });
// }

delete(user_id,challenge_id){
  return this.schema.deleteOne({user_id:user_id,challenge_id:challenge_id});
}
// delete(_id) {
//   return this.schema.findByIdAndDelete(_id);
// }

}


module.exports = new UserChallenge();
