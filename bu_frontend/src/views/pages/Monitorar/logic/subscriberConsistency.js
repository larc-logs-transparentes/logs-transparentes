import client from './client'
const MQTT_TOPIC = 'logs-transparentes/consistencyProof'

const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

let consistencyProofData = {
  tree_size_1: null,
  tree_size_2: null,
  first_hash: null,
  second_hash: null,
  consistency_path: [],
  log_id: 0,
  ultimo: false,
}

/// Variáveis para atualizar o Setter do front.
let qtd_busAdicionados=[]
let secondhash = []
let logid=[]
let consistency_proof=[]

var ultimoID  = -1 //Armazena o dado referente ao último envio do publisher processado
const bufferJSONs = [] //Buffer dos dados publicados  

export function subscriber(setSecondHash,setLogId,setBusAdicionados, setProof){
  client.on('message',function (topic, payload, packet) {
    if(topic == MQTT_TOPIC){
      /* -------------------Recebe e armazena os dados-------------------- */
      console.log(`Topic: ${topic}, Message: ${payload}, Qos: ${packet.qos}`)
      consistencyProofData = JSON.parse(payload)
      if(ultimoID == -1) 
        ultimoID = consistencyProofData.log_id - 1
      if(consistencyProofData.log_id > ultimoID)
        inserirNoBuffer(consistencyProofData) //insere no buffer ordenado pelo "log_id"
      else
      console.log("Pacote repetido ou já processado")
      
      /* ----------------------------------------------------------------- */

      /* ------------------Processa os dados do buffer-------------------- */
      while(bufferJSONs.length > 0){ //Enquanto conter dados no buffer
        if(bufferJSONs[bufferJSONs.length - 1].log_id == ultimoID + 1){ //se o dado mais recente no buffer for o próximo em relação aos processados
          consistencyProofData = bufferJSONs.pop() //remove do buffer

          secondhash.push(consistencyProofData.second_hash)
          setSecondHash(secondHash => secondhash)

          logid.push(consistencyProofData.log_id)
          setLogId(logId => logid)
        
          qtd_busAdicionados.push(consistencyProofData.tree_size_2-consistencyProofData.tree_size_1)
          setBusAdicionados(busAdicionados => qtd_busAdicionados)

          consistency_proof.push(provaDeConsistencia(consistencyProofData))
          setProof(proof => consistency_proof)

          if(consistencyProofData.ultimo == true){ //se este dado estiver marcado como último, encerra o programa
            console.log("---------------------FIM---------------------")
            console.log("---------------------FIM---------------------")
            console.log("---------------------FIM---------------------")
            console.log("---------------------FIM---------------------")
            ultimoID ++
          }
          ultimoID ++ //senão, incrementa o contador de processados
        }
        else //se o dado mais recente no buffer não for o próximo na ordem dos que foram processados
          break //quebra o laço para esperar mais dados
      }
    }
      /* ----------------------------------------------------------------- */
  })
}

/* Insere "data" no buffer e o ordena em ordem decrescente de "cont" */
function inserirNoBuffer(data) {
  bufferJSONs.push(data)
  bufferJSONs.sort((a, b) => b.log_id - a.log_id)
}

export function provaDeConsistencia(consistencyProofData){
  if(consistencyProofData.tree_size_1 == 0)
    return new MerkleTree(consistencyProofData.consistency_path, SHA256).getRoot().toString('hex') === consistencyProofData.second_hash; 

  /* 1. If consistency_path is an empty array, stop and fail the proof verification. */
  if(consistencyProofData.consistency_path == null)
    return false
  
  /* 2. If first is an exact power of 2, then prepend first_hash to the consistency_path array. */
  if(isPowOf2(consistencyProofData.tree_size_1))
    consistencyProofData.consistency_path.unshift(consistencyProofData.first_hash)
  
  /* 3. Set fn to first - 1 and sn to second - 1. */
  let fn = consistencyProofData.tree_size_1 - 1;
  let sn = consistencyProofData.tree_size_2 - 1;
  
  /* 4. If LSB(fn) is set, then right-shift both fn and sn equally until LSB(fn) is not set. */
  while(lsb(fn)){
    fn >>= 1
    sn >>= 1    
  }

  /* 5. Set both fr and sr to the first value in the consistency_path array. */
  let fr = consistencyProofData.consistency_path[0];
  let sr = consistencyProofData.consistency_path[0];

  /* 6. For each subsequent value c in the consistency_path array */
  for (let index = 1; index < consistencyProofData.consistency_path.length; index++) {
    var c = consistencyProofData.consistency_path[index]

    /* If sn is 0, stop the iteration and fail the proof verification. */
    if(sn === 0)
      return false
    
    /* If LSB(fn) is set, or if fn is equal to sn, then: */
    if(lsb(fn) || fn === sn){
      /* 1. Set fr to HASH(0x01 || c || fr) */
      fr = createHash(c, fr)
      /* Set sr to HASH(0x01 || c || sr) */
      sr = createHash(c, sr)

      /* 2. If LSB(fn) is not set, then right-shift both fn and sn equally until either LSB(fn) is set or fn is 0. */
      while(!lsb(fn) && fn != 0){
        fn >>= 1
        sn >>= 1
      }
    } else { /* Otherwise */
      /* 1. Set sr to HASH(0x01 || sr || c) */
      sr = createHash(sr,c)
    }
    
    /* Finally, right-shift both fn and sn one time. */
    fn >>= 1
    sn >>= 1
  }

  /* 7. After completing iterating through the consistency_path array as described above, verify that the fr calculated is equal to the first_hash supplied, that the sr calculated is equal to the second_hash supplied and that sn is 0. */
  return fr === consistencyProofData.first_hash && sr === consistencyProofData.second_hash && sn == 0;
}

function isPowOf2(v){
  return v && !(v & (v - 1));
}

function lsb(v){
  return (v & 1) === 1;
}

function createHash(left, right){
  return new MerkleTree([left, right], SHA256).getRoot().toString('hex')
}