const mongoose = require("mongoose");

const merkletree_info = new mongoose.Schema({
    tree_name: String,
    election_id: Number,
    index: Number,
    hash: String,
});

const schema_bu = new mongoose.Schema({
    eleicoes: [Number],
    UF: String,
    zona: Number,
    secao: Number,
    municipio: String,
    bu_json: String,
    bu: Buffer,
    merkletree_info: [merkletree_info],
});

module.exports = { schema_bu }