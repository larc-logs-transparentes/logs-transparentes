const db = require("../models");
const modeloBoletim = require("../models/bu.model")
const merkletree_adapter = require("../adapters/merkletree.adapter")
const mongoose = require("mongoose");
const axios = require('axios');


/* ----------------------------------- */
const mqtt = require('mqtt');
const mosquitto_url = require('../config/config').mosquitto_url

const consistencyCheckData = {
  raizAssinada: null,
  BUsAdicionados: [],
  cont: 0,
  ultimo: false,
}

/* Dados necessários para os monitores verificarem a prova de consistência */
const consistencyProofData = {
  tree_size_1: 0, /* Tamanho da última árvore com consistência provada */
  tree_size_2: 0, /* Tamanho da árvore com consistência a ser provada */
  first_hash: null, /* Última raiz consistente */
  second_hash: null, /* Raiz atual */
  consistency_path: [], /* Dados necessários para se realizar a prova */
  log_id: 0,
  ultimo: false,
}

const TAM_MTREE_PARCIAL = 4
const QTD_BUs_CONSISTENCY_PROOF = TAM_MTREE_PARCIAL //Frequência de envio da prova de consistência
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
      merkletree_leaf_id: merkletree_data.leaf_index,
      merkletree_leaf: merkletree_data.added_leaf,
      ...data
    })

    consistencyCheckData.BUsAdicionados.push(merkletree_data.added_leaf)
    console.log(merkletree_data.added_leaf + " " + consistencyCheckData.BUsAdicionados.length +" adicionado ao buffer de BUs")

    if(consistencyCheckData.BUsAdicionados.length >= TAM_MTREE_PARCIAL){
      merkletree_adapter.getTreeRoot().then((treeRoot) => {
        consistencyCheckData.raizAssinada = treeRoot
        publish("guilherme/teste", JSON.stringify(consistencyCheckData))
        console.log("\n\nPublicado teste de consistência")
        console.log(JSON.stringify(consistencyCheckData))
        consistencyCheckData.BUsAdicionados = []
        consistencyCheckData.cont ++
      }) 
    }

    consistencyProofData.tree_size_2++ //A cada BU inserido, o tamanho da árvore a ser provada aumenta
    if(consistencyProofData.tree_size_2 % QTD_BUs_CONSISTENCY_PROOF == 0){ 
      //Enviar prova de consistência
      merkletree_adapter.getProof(consistencyProofData.tree_size_1).then((proof) => {
        //Obtendo os dados necessários para realizar a prova
        consistencyProofData.consistency_path = proof
        merkletree_adapter.getTreeRoot().then((treeRoot => {
          //Obtendo raiz atual
          consistencyProofData.second_hash = treeRoot
          publish('guilherme/consistencyProof', JSON.stringify(consistencyProofData))
          console.log("\n\nPublicado prova de consistência")
          console.log(JSON.stringify(consistencyProofData))
          consistencyProofData.first_hash = consistencyProofData.second_hash
          consistencyProofData.tree_size_1 = consistencyProofData.tree_size_2
          consistencyProofData.log_id ++
        }))
      })
    }
  })
  return
};

function getVotesByIdRange(data) {
  console.log(' o Vetor que entra na função')
  let votesum=totalizarvotos(data)
  let formattedVotesum = delete votesum._id

  return votesum
}

function totalizarvotos(data) {
  const totaldevotos = []
  console.log(data)
    for (let i = 0; i < data.length; i++) { //percorre BUs
        const candidatos = data[i].votos;
        for (let j = 0; j < candidatos.length; j++) { //percorre registros dos candidatos em um BU
            const element = candidatos[j];
            let aux = totaldevotos.findIndex(candidato => candidato.nome == element.nome)
            
            if(aux != -1) //se encontrado candidato no array
                totaldevotos[aux].votos += element.votos //soma os votos
            else
                totaldevotos.push(element) //insere no array
        } 
    }

  totaldevotos.sort((a, b) => b.votos - a.votos) //ordena por qtd de votos
  console.log('Resultado Final')
  console.log(totaldevotos)
  return totaldevotos
}

// Retrieve all BUs from the database.
exports.findAll = () => {
  return modeloBoletim.modeloBoletim1.find({}).then((data) => {
    return data
  })
};
// Find BUs inside a ID range.
exports.findByIdRange = (id_inicial, id_final) => {
  return modeloBoletim.modeloBoletim1.find({id:{ $gte:id_inicial, $lte:id_final}})
  .then((data) => {
    return getVotesByIdRange(data)
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

/**
* publish
* @desc - publica os dados contidos no payload no tópico correspondente
* @param {String} topic
* @param {any} payload - lista ordenada das n entradas da árvore
*/
function publish(topic, payload){
  const client  = mqtt.connect(mosquitto_url)
  client.on('connect', function () {
      client.publish(topic, payload, {qos: 2})
      client.end()
  })
}