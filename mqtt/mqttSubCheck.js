const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const TAM_MAX_MTREE_PARCIAL = 4

consistencyProofData = {
  raizAssinada: null,
  BUsAdicionados: [],
  cont: 0,
  ultimo: false,
}

/* ---------------------- Configuração mqtt ------------------------- */
const mqtt = require('mqtt')
const mosquitto_url = require('./config.json').mosquitto_url
const client  = mqtt.connect(mosquitto_url)

client.on('connect', function () {
  client.subscribe('guilherme/teste', {qos: 2}, function (err) {
    if (!err) 
      console.log("Conectado")
  })
})
/* ----------------------------------------------------------------- */

ultimoCont  = -1 //Armazena o dado referente ao último envio do publisher processado
const bufferJSONs = [] //Buffer dos dados publicados  
const arvorePrincipal = new MerkleTree([], SHA256)
const arvoreParcial = new MerkleTree([], SHA256)

main()

function main(){
  client.on('message', function (topic, payload, packet) {

    /* -------------------Recebe e armazena os dados-------------------- */
    console.log(`Topic: ${topic}, Message: ${payload}, Qos: ${packet.qos}`)
    consistencyProofData = JSON.parse(payload)
    inserirNoBuffer(consistencyProofData) //insere no buffer ordenado pelo dado "cont"
    /* ----------------------------------------------------------------- */

    /* ------------------Processa os dados do buffer-------------------- */
    while(bufferJSONs.length > 0){ //Enquanto conter dados no buffer
      if(bufferJSONs[bufferJSONs.length - 1].cont == ultimoCont + 1){ //se o dado mais recente no buffer for o próximo em relação aos processados
        consistencyProofData = bufferJSONs.pop() //remove do buffer
        console.log(provaDeConsistencia(arvorePrincipal, arvoreParcial, consistencyProofData.BUsAdicionados, consistencyProofData.raizAssinada)) //processa  
        if(consistencyProofData.ultimo == true) //se este dado estiver marcado como último, encerra o programa
          process.exit(1)
        ultimoCont ++ //senão, incrementa o contador de processados
      }
      else //se o dado mais recente no buffer não for o próximo na ordem dos que foram processados
        break //quebra o laço para esperar mais dados
    }
    /* ----------------------------------------------------------------- */
  })
}

/* Insere "data" no buffer e o ordena em ordem decrescente de "cont" */
function inserirNoBuffer(data) {
  bufferJSONs.push(data)
  bufferJSONs.sort((a, b) => b.cont - a.cont)
}

/* Recalcula a raiz com base nas folhas inseridas e compara com a raiz assinada */
function provaDeConsistencia(merklePrincipal, merkleParcial, folhasInseridas, raizAssinada){
  folhasInseridas.reverse()

  /* enquanto existirem folhas para serem adicionadas */
  while(folhasInseridas.length > 0){
    /* Se a árvore parcial ainda não estiver completa */
    if(merkleParcial.getLeafCount() < TAM_MAX_MTREE_PARCIAL){
      folha = folhasInseridas.pop()
      console.log(folha + " adicionado a árvore parcial")
      merkleParcial.addLeaf(folha)
      printTrees()
    } else { 
      /* Se a árvore parcial estiver completa */
      merklePrincipal.addLeaf(merkleParcial.getRoot())
      console.log("Raiz da árvore parcial adicionada a principal")
      merkleParcial.resetTree()
      console.log("Árvore parcial resetada")
      printTrees()
    }
  }

  /* TODOS BUs INSERIDOS */

  /* Se a árvore parcial não estiver completa(envio por intervalo de tempo) */
  /* Árvore parcial continua armazenada */
  if(merkleParcial.getLeafCount() != TAM_MAX_MTREE_PARCIAL){
    //raiz = obterRaizMerklePrincipal(merklePrincipal.getLeaves().concat(merkleParcial.getRoot()))
    raiz = obterRaizMerklePrincipal(merklePrincipal, merkleParcial.getRoot())
  }

  /* Se a árvore parcial estiver completa(envio por quantidade) */
  if(merkleParcial.getLeafCount() == TAM_MAX_MTREE_PARCIAL){
    merklePrincipal.addLeaf(merkleParcial.getHexRoot())
    console.log("Raiz da árvore parcial adicionada a principal")

    raiz = merklePrincipal.getRoot().toString('hex')

    merkleParcial.resetTree()
    console.log("Árvore parcial resetada")
  }

  printTrees()

  console.log(raiz)
  console.log(raizAssinada)

  if(raiz == raizAssinada)
    return true
  else
    return false
}

/* Retorna a raiz da Merkle Tree principal caso fosse adicionado a raiz da parcial*/
function obterRaizMerklePrincipal(merklePrincipal, raizMerkleParcial){
  return new MerkleTree(merklePrincipal.getLeaves().concat(raizMerkleParcial), SHA256).getRoot().toString('hex')
}

function printTrees(){
  console.log("PRINCIPAL")
  arvorePrincipal.print()
  console.log("PARCIAL")
  arvoreParcial.print()
  console.log()
}