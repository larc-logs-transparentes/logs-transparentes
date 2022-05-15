const db = require("../models");
const merkletree_adapter = require("../adapters/merkletree.adapter")

/* ----------------------------------- */
const mqtt = require('mqtt');

const consistencyProofData = {
  raizAssinada: null,
  BUsAdicionados: [],
  cont: 0,
  ultimo: false,
}

const TAM_MTREE_PARCIAL = 4
/* ----------------------------------- */

const BU = db.bu;

// Create and Save a new BU
exports.create = (data) => {
  buString = data.turno + data.secao + data.zona + data.UF + JSON.stringify(data.votos)
  console.log("Debug BU")
  console.log(buString)
  console.log({"BU": data})

  merkletree_adapter.addLeaf(buString).then((merkletree_data) => {
    BU.create({
      merkletree_leaf_id: merkletree_data.leaf_index,
      merkletree_leaf: merkletree_data.added_leaf,
      ...data
    })

    consistencyProofData.BUsAdicionados.push(merkletree_data.added_leaf)
    console.log(merkletree_data.added_leaf + " " + consistencyProofData.BUsAdicionados.length +" adicionado ao buffer de BUs")
  })

  if(consistencyProofData.BUsAdicionados.length >= TAM_MTREE_PARCIAL){
    merkletree_adapter.getTreeRoot().then((treeRoot) => {
      consistencyProofData.raizAssinada = treeRoot
      publish("guilherme/teste", JSON.stringify(consistencyProofData))
      console.log("Publicado teste de consistência")
      consistencyProofData.BUsAdicionados = []
      consistencyProofData.cont ++
    }) 
  }

  return
};


// Retrieve all BUs from the database.
exports.findAll = () => {
  return BU.findAll({}).then((data) => {
    return data
  })
};

// Find a single BU with an id
exports.findById = (id) => {
  console.log({id})
  return BU.findByPk(id).then((data) => {
    return data
  })
};

// Find BU by BU info
exports.findByInfo = (turno, uf, zona, secao) => {
  console.log("findByInfo")
  return BU.findOne({
    where: {
      turno: turno,
      secao: secao,
      zona: zona,
      UF: uf
    }
  }).then((data) => {
    return data
  })
};

function publish(topic, payload){
  const client  = mqtt.connect('mqtt://test.mosquitto.org')

  client.on('connect', function () {
      client.publish(topic, payload, {qos: 2})
      client.end()
  })
}