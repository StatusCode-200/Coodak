const projectsShema = require("../models/projectSchema");

class Projects {
 constructor(){
   this.schema = projectsShema;
 }
get(owner_id) {
  return owner_id ? this.schema.find() : this.schema.find({ owner_id }) ;
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
