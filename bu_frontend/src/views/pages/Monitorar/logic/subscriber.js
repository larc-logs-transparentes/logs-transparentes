import client from "./client";

const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const TAM_MAX_MTREE_PARCIAL = 4



let consistencyProofData = {
    raizAssinada: null,
    BUsAdicionados: [],
    cont: 0,
    ultimo: false,
}
/// Variáveis para atualizar o Setter do front.
let RA=[]
let CTDR=[]
let PDC = []
let BUA=[]
let Busave=[]

let ultimoCont  = -1 //Armazena o dado referente ao último envio do publisher processado
const bufferJSONs = [] //Buffer dos dados publicados  
const arvorePrincipal = new MerkleTree([], SHA256)
const arvoreParcial = new MerkleTree([], SHA256)

export function subscriber(setProofData,setRaiz,setContador,setCor,setBU){
  client.on('message', function (topic, payload, packet) {

    /* -------------------Recebe e armazena os dados-------------------- */
    console.log(`Topic: ${topic}, Message: ${payload}, Qos: ${packet.qos}`)
    consistencyProofData = JSON.parse(payload)
    inserirNoBuffer(consistencyProofData) //insere no buffer ordenado pelo dado "cont"
    
    /* ----------------------------------------------------------------- */

    /* ------------------Processa os dados do buffer-------------------- */
    if (bufferJSONs.length == 0){
      setRaiz(raiz => RA)
      setContador(contador => CTDR)
      setBU(buadd => BUA)
      setCor(cor => PDC)
      }
    while(bufferJSONs.length > 0){ //Enquanto conter dados no buffer
      if(bufferJSONs[bufferJSONs.length - 1].cont == ultimoCont + 1){ //se o dado mais recente no buffer for o próximo em relação aos processados
        consistencyProofData = bufferJSONs.pop() //remove do buffer
        //pra coletar no front //
        
        RA.push(consistencyProofData.raizAssinada)
        setRaiz(raiz => RA)
        CTDR.push(consistencyProofData.cont)
        setContador(contador => CTDR)
        BUA.push(consistencyProofData.BUsAdicionados.length)
        setBU(buadd => BUA)
        setProofData(proofData => consistencyProofData)
        //console.log(consistencyProofData)
        Busave=consistencyProofData.BUsAdicionados

        // ISSO AQUI TAVA DANDO BO, ele faz com que o BUsAdicionados[] vire zero, por isso botei o busave
        PDC.push(provaDeConsistencia(arvorePrincipal, arvoreParcial, Busave, consistencyProofData.raizAssinada))
        setCor(cor => PDC)
        ///////////////////////////////////////

        // TODO: aqui acho q precisa retornar as infos para a pagina conseguir renderizar
        // O problema disso é q se dermos um return ele sai da funcao
        
        //console.log(provaDeConsistencia(arvorePrincipal, arvoreParcial, consistencyProofData.BUsAdicionados, consistencyProofData.raizAssinada)) //processa  

        //setProofData(proofData => provaDeConsistencia(arvorePrincipal, arvoreParcial, consistencyProofData.BUsAdicionados, consistencyProofData.raizAssinada))
        if(consistencyProofData.ultimo == true){ //se este dado estiver marcado como último, encerra o programa
          console.log("---------------------FIM---------------------")
          console.log("---------------------FIM---------------------")
          console.log("---------------------FIM---------------------")
          console.log("---------------------FIM---------------------")

          ultimoCont ++
          
        }
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
  if(bufferJSONs.find(element => element.cont == data.cont) != undefined || data.cont <= ultimoCont){
    console.log("CANCELADO")
    return
  }
  bufferJSONs.push(data)
  bufferJSONs.sort((a, b) => b.cont - a.cont)
}

/* Recalcula a raiz com base nas folhas inseridas e compara com a raiz assinada */
export function provaDeConsistencia(merklePrincipal, merkleParcial, folhasInseridas, raizAssinada){
  folhasInseridas.reverse()

  /* enquanto existirem folhas para serem adicionadas */
  while(folhasInseridas.length > 0){
    /* Se a árvore parcial ainda não estiver completa */
    if(merkleParcial.getLeafCount() < TAM_MAX_MTREE_PARCIAL){
      let folha = folhasInseridas.pop()
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

  let raiz 
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

