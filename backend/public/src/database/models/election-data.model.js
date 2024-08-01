const mongoose = require("mongoose");
const {merkletree_info} = require("./merkletree-info.model");

const schema_election_data = new mongoose.Schema({
    data_name: String,
    filename: String,
    data: Buffer,
    merkletree_info: { type: Object, of: merkletree_info },
    zona: Number,
    secao: Number,
    eleicoes: [Number],
});

schema_election_data.index({ "merkletree_info.$**": 1 });

module.exports = { schema_election_data }