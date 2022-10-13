const mongoose = require("mongoose");
// const url = 'mongodb://127.0.0.1:5432/bu_db';
// mongoose.connect(url)

const candidatos = new mongoose.Schema({  //subSchema para os candidatos 
    partido: {type: String,},
    nome: {type: String,},
    votos: {type: Number,},
    _id: { type: String, required: true }
})

const boletimSchema = new mongoose.Schema({  ///aaa
    _id: { type: Number, required: true }  ,
    id: { type: Number, required: true }  ,
    secao: String,
    zona: String,
    UF: String,
    turno: String,
    votos: [candidatos],
    merkletree_leaf_id: String,
    merkletree_leaf: String,
    __v: Number
});

const InfoBuSchema = new mongoose.Schema({  
    _id: { type: Number, required: true },
    id: { type: Number, required: true },
    secao: String,
    zona: String,
    UF: String,
    turno: String,
    regras_aplicadas: String,
    votos_validos: [candidatos],
    indice_na_arvore_de_BUs: Number, 
    merkletree_index: String,
    merkletree_leaf: String,
});

const modeloBoletim1 = mongoose.model("bu",boletimSchema) //"bu" = collection of database
const modeloInfoBU = mongoose.model("InfoBU",InfoBuSchema) 

module.exports = {modeloBoletim1, modeloInfoBU}