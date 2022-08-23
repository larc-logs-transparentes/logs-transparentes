const db = require("../models");
const modeloBoletim = require("../models/bu.model")
const merkletree_adapter = require("../adapters/merkletree.adapter")
const mongoose = require("mongoose");


/* ----------------------------------- */
const mqtt = require('mqtt');
const { mode } = require("crypto-js");
const mosquitto_url = require('../config/config').mosquitto_url

const consistencyProofData = {
  raizAssinada: null,
  BUsAdicionados: [],
  cont: 0,
  ultimo: false,
}

const TAM_MTREE_PARCIAL = 64
/* ----------------------------------- */

// const BU = db.bu;

//const BU = db.bu;
// Create and Save a new BU
exports.create = (data) => {
  buString = data.turno + data.secao + data.zona + data.UF + JSON.stringify(data.votos)
  console.log("Debug BU")
  console.log(buString)
  console.log({"BU": data})

  merkletree_adapter.addLeaf(buString).then((merkletree_data) => {
    modeloBoletim.modeloBoletim1.create({
      merkletree_leaf_id: merkletree_data.leaf_id,
      merkletree_leaf: merkletree_data.added_leaf,
      ...data
    })

    consistencyProofData.BUsAdicionados.push(merkletree_data.added_leaf)
    console.log(merkletree_data.added_leaf + " " + consistencyProofData.BUsAdicionados.length +" adicionado ao buffer de BUs")
    
    if(consistencyProofData.BUsAdicionados.length >= TAM_MTREE_PARCIAL){
      merkletree_adapter.getTreeRoot().then((treeRoot) => {
        consistencyProofData.raizAssinada = treeRoot
        publish("guilherme/teste", JSON.stringify(consistencyProofData))
        console.log("\n\nPublicado teste de consistência")
        console.log(JSON.stringify(consistencyProofData))
        consistencyProofData.BUsAdicionados = []
        consistencyProofData.cont ++
      }) 
    }
  })
  return
};


// Retrieve all BUs from the database.
exports.findAll = () => {
  return modeloBoletim.modeloBoletim1.find({}).then((data) => {
    return data
  })
};

/* let teste = await (this.findByIdRange(1, 3)) */
exports.findByIdRange = (id_inicial, id_final) => {
  return modeloBoletim.modeloBoletim1.find({id:{ $gte:id_inicial, $lte:id_final}})
  .then((data) => {
    return data.sort((a, b) => {b.id - a.id})
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

function publish(topic, payload){
  const client  = mqtt.connect(mosquitto_url)

  client.on('connect', function () {
      client.publish(topic, payload, {qos: 2})
      client.end()
  })
}