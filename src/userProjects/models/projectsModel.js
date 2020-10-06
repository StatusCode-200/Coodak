const projectsShema = require("../models/projectSchema");

class Projects {
  constructor(){
    this.schema = projectsShema;
  }
  async get() {
    return  await this.schema.find().populate("owner_id").exec();
  }

  async getById(id) {
    return await this.schema.findOne({_id:id});
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(projectId, record){
    return this.schema.findOneAndUpdate({_id : projectId},record, { new: true });
  }

  patch(userName, record){
    return this.schema.findOneAndUpdate({userName},record, { new: true });
  }

  delete(userName){
    return this.schema.deleteOne({userName:userName});
  }
}


module.exports = new Projects();
