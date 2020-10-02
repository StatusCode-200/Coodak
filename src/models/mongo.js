'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  get(userName) {
    return this.schema.find(userName);
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

module.exports = Model;