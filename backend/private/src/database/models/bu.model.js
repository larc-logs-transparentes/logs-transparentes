const mongoose = require("mongoose");

const schema_bu = new mongoose.Schema({
    id_eleicao: Number,
    UF: String,
    zona: Number,
    secao: Number,
    municipio: String,
    bu_inteiro: String,
    merkletree_leaf_index: Number,
    merkletree_leaf: String,
});

schema_bu.index({ merkletree_leaf_index:1 });
schema_bu.index({ UF:1 });
schema_bu.index({ zona:1 });
schema_bu.index({ secao:1 });
schema_bu.index({ municipio:1 });
module.exports = { schema_bu } 