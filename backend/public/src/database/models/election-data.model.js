const mongoose = require("mongoose");
const {merkletree_info} = require("./merkletree-info.model");

const schema_election_data = new mongoose.Schema({
    file_name: String,
    data: Buffer,
    merkletree_info: { type: Object, of: merkletree_info },
});

schema_election_data.index({ "file_name": 1 });
schema_election_data.index({ "merkletree_info.$**": 1 });

module.exports = { schema_election_data }