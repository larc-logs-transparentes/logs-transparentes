//const db = require("../models");
const modeloBoletim = require("../models/bu.model")

const merkletree_adapter = require("../adapters/merkletree.adapter")
const mongoose = require("mongoose");
//const BU = db.bu;
// Create and Save a new BU
exports.create = (data) => {
  buString = data.turno + data.secao + data.zona + data.UF + JSON.stringify(data.votos)
  console.log("Debug BU")
  console.log(buString)
  console.log({"BU": data})
  if(data.turno == 1){
    return merkletree_adapter.addLeaf(buString).then((merkletree_data) => {
      modeloBoletim.modeloBoletim1.create({
        _id: data._id,
        id: data.id, //aa
        secao:data.secao,
        zona:data.zona,
        UF: data.UF,
        turno:data.turno,
        votos: data.votos,
        merkletree_leaf_id: merkletree_data.leaf_index,
        merkletree_leaf: merkletree_data.added_leaf,
        __v: data.__v
      },function(err,res){
        if (err) throw err;
    })})     
  } 
  };


// Retrieve all BUs from the database.
exports.findAll = () => {
  return modeloBoletim.modeloBoletim1.find({}).then((data) => {
    return data
  })
};

// Find a single BU with an id
exports.findById = (id) => {
  console.log({id})
  return modeloBoletim.modeloBoletim1.findOne({id: id}).then((data) => {
    return data
  })
};

// Find BU by BU info
 exports.findByInfo = (turno,UF,secao,zona) =>{
        return modeloBoletim.modeloBoletim1.findOne({turno:turno, UF:UF, secao:secao, zona:zona}
          
          ).then((data) =>{
            return data;
          }) 
}


  exports.Sum = () => {
    return modeloBoletim.modeloBoletim1.aggregate([
      {$unwind:"$votos"},
      {$group:{
        _id:"$votos.nome",
        votos:  {$sum: "$votos.votos"}
      }}]).then((data)=>{
        return data;
      })
};
 
    