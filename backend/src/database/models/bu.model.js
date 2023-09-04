const mongoose = require("mongoose");

const schema_candidato = new mongoose.Schema({  //subSchema para os candidatos 
    cargo: {type: String,},
    partido: {type: Number,},
    codigo: {type: Number,},
    votos: {type: Number,},
    _id: { type: String, required: true }
})

const schema_bu = new mongoose.Schema({
    id: { type: Number, required: true },
    turno: String,
    UF: String,
    zona: Number,
    secao: Number,
    cidade: String,
    bu_inteiro: String,
    votos: [schema_candidato],
    merkletree_leaf_index: Number,
    merkletree_leaf: String,
});
schema_bu.index({ merkletree_leaf_index:1});
schema_bu.index({ UF:1});
schema_bu.index({ zona:1});
schema_bu.index({ secao:1});
schema_bu.index({ turno:1});
module.exports = { schema_bu } 