const mongoose = require("mongoose");

const candidato_identificavel = new mongoose.Schema({  //subSchema para os candidatos 
    cargo: {type: String,},
    partido: {type: Number,},
    codigo: {type: Number,},
    votos: {type: Number,},
    _id: { type: String, required: true }
})

const boletimSchema = new mongoose.Schema({
    _id: { type: Number, required: true }  ,
    id: { type: Number, required: true }  ,
    turno: String,
    UF: String,
    zona: Number,
    secao: Number,
    cidade: String,
    bu_inteiro: String,
    votos: [candidato_identificavel],
    merkletree_leaf_index: String,
    merkletree_leaf: String,
    __v: Number,
});

const InfoBuSchema = new mongoose.Schema({  
    _id: { type: Number, required: true },
    id: { type: Number, required: true },
    secao: Number,
    zona: Number,
    UF: String,
    turno: String,
    cidade: String,
    bu_inteiro: String,
    regras_aplicadas: String,
    votos_validos: [candidato_identificavel],
    indice_na_arvore_de_BUs: Number, 
    merkletree_index: String,
    merkletree_leaf: String,
});

const modeloBoletim = mongoose.model("bu",boletimSchema) //"bu" = collection of database
const modeloInfoBU = mongoose.model("InfoBU",InfoBuSchema) 

module.exports = {modeloBoletim, modeloInfoBU}