const mongoose = require("mongoose");
// const url = 'mongodb://127.0.0.1:5432/bu_db';
// mongoose.connect(url)

// const candidatos = new mongoose.Schema({  //subSchema para os candidatos 
//     partido: {type: String,},
//     nome: {type: String,},
//     votos: {type: Number,},
//     _id: { type: String, required: true }
// })

const candidato_identificavel = new mongoose.Schema({  //subSchema para os candidatos 
    partido: {type: Number,},
    codigo: {type: Number,},
    votos: {type: Number,},
    _id: { type: String, required: true }
})


// Old boletim schema:
// const boletimSchema = new mongoose.Schema({  ///aaa
//     _id: { type: Number, required: true }  ,
//     id: { type: Number, required: true }  ,
//     secao: String,
//     zona: String,
//     UF: String,
//     turno: String,
//     votos: [candidatos],
//     merkletree_leaf_id: String,
//     merkletree_leaf: String,
//     __v: Number
// });


const boletimSchema = new mongoose.Schema({
    _id: { type: Number, required: true }  ,
    id: { type: Number, required: true }  ,
    turno: String,
    UF: String,
    zona: Number,
    secao: Number,
    bu_inteiro: String,
    merkletree_leaf_id: String,
    merkletree_leaf: String,
    __v: Number,
});

const modeloBoletim1 = mongoose.model("bu",boletimSchema) //"bu" = collection of database


module.exports = {modeloBoletim1}