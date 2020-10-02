const invetationSchema = require("../model/invetationSchema.js");

class Invetation {
    constructor() {
        this.schema = invetationSchema;
    }
    async get(collaborator_id) {
        return await this.schema.find({ collaborator_id: collaborator_id });

    }

    create(record) {
        const newRecord = new this.schema(record);
        return newRecord.save();
    }

    // update(project_id, record){
    //   return this.schema.findOneAndUpdate({project_id},record, { new: true });
    // }

    delete(owner_id) {
        return this.schema.findOneAndDelete({ owner_id: owner_id });
    }
    // delete(_id) {
    //   return this.schema.findByIdAndDelete(_id);
    // }

}


module.exports = new Invetation();
