const mongoose = require("mongoose");

const merkletree_info = new mongoose.Schema({
    tree_name: String,
    index: Number,
    hash: String,
});

const schema_bu = new mongoose.Schema({
    eleicoes: [Number],
    filename: String,
    UF: String,
    zona: Number,
    secao: Number,
    municipio: String,
    bu_json: String,
    bu: Buffer,
    merkletree_info: { type: Map, of: merkletree_info }
});

schema_bu.index({ UF:1 });
schema_bu.index({ zona:1 });
schema_bu.index({ secao:1 });
schema_bu.index({ municipio:1 });
schema_bu.index({ eleicoes:1 });
schema_bu.index({ merkletree_info:1 });
schema_bu.index({ UF:1, zona:1, secao:1 });

module.exports = { schema_bu }