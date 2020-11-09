const projectsShema = require("../models/projectSchema");

class Projects {
  constructor(){
    this.schema = projectsShema;
  }
  async getByUserId(userId) {
    return  await this.schema.find({owner_id: userId}).populate("owner_id").exec();
  }

  async getById(id) {
    return await this.schema.findOne({_id:id}).populate("owner_id").exec();
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(projectId, record){
    return this.schema.findOneAndUpdate({_id : projectId},record, { new: true });
  }

  delete(userId,_id){
    return this.schema.deleteOne({userId:userId, _id:_id});
  }

  // patch(userName, record){
  //   return this.schema.findOneAndUpdate({userName},record, { new: true });
  // }
  //
  // delete(userName){
  //   return this.schema.deleteOne({userName:userName});
  // }
}


module.exports = new Projects();
