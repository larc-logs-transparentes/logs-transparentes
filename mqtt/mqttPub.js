const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

const mqtt = require('mqtt')

let consistencyProofData = {
    tree_size_1: null,
    tree_size_2: null,
    first_hash: null,
    second_hash: null,
    consistency_path: [],
    log_id: 0,
    ultimo: false,
}

/* ------------------------- 1º envio ------------------------------ */

BUs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const TSEMerkleTree = new MerkleTree(BUs.map(x => SHA256(x)), SHA256)

consistencyProofData.first_hash = null;
consistencyProofData.tree_size_1 = 0;
consistencyProofData.second_hash = TSEMerkleTree.getRoot().toString('hex')
consistencyProofData.tree_size_2 = TSEMerkleTree.getLeafCount()
consistencyProofData.consistency_path = BUs.map(x => SHA256(x).toString())
consistencyProofData.log_id = 0

publish('guilherme/teste', JSON.stringify(consistencyProofData))

/* ------------------------- 2º envio ------------------------------ */
  
consistencyProofData.first_hash = consistencyProofData.second_hash;
consistencyProofData.tree_size_1 = consistencyProofData.first_hash;

BUs = ['i', 'j', 'k', 'l']
TSEMerkleTree.addLeaves(BUs.map(x => SHA256(x)))
 
consistencyProofData.second_hash = TSEMerkleTree.getRoot().toString('hex')
consistencyProofData.tree_size_2 = TSEMerkleTree.getLeafCount()
consistencyProofData.consistency_path = BUs.map(x => SHA256(x).toString())
consistencyProofData.log_id = 1

publish('guilherme/teste', JSON.stringify(consistencyProofData))

/* ------------------------- 3º envio ------------------------------ */
 
BUs = ['m', 'n']
TSEMerkleTree.addLeaves(BUs.map(x => SHA256(x)))
 
consistencyProofData.raizAssinada = TSEMerkleTree.getRoot().toString('hex')
consistencyProofData.BUsAdicionados = BUs.map(x => SHA256(x).toString())
consistencyProofData.cont = 2

//publish('guilherme/teste', JSON.stringify(consistencyProofData))

/* ------------------------- 4º envio ------------------------------ */
 
BUs = ['o', 'p']
TSEMerkleTree.addLeaves(BUs.map(x => SHA256(x)))
 
consistencyProofData.raizAssinada = TSEMerkleTree.getRoot().toString('hex')
consistencyProofData.BUsAdicionados = BUs.map(x => SHA256(x).toString())
consistencyProofData.cont = 3

//publish('guilherme/teste', JSON.stringify(consistencyProofData))
 
/* ------------------------- 5º envio ------------------------------ */

BUs = ['q', 'r']
TSEMerkleTree.addLeaves(BUs.map(x => SHA256(x)))
 
consistencyProofData.raizAssinada = TSEMerkleTree.getRoot().toString('hex')
consistencyProofData.BUsAdicionados = BUs.map(x => SHA256(x).toString())
consistencyProofData.cont = 4

//publish('guilherme/teste', JSON.stringify(consistencyProofData))
 
/* ------------------------- 6º envio ------------------------------ */

BUs = ['s', 't', 'v']
TSEMerkleTree.addLeaves(BUs.map(x => SHA256(x)))

consistencyProofData.raizAssinada = TSEMerkleTree.getRoot().toString('hex')
consistencyProofData.BUsAdicionados = BUs.map(x => SHA256(x).toString())
consistencyProofData.cont = 5
consistencyProofData.ultimo = true

//publish('guilherme/teste', JSON.stringify(consistencyProofData))
/* -------------------------------------------------------------- */

console.log(TSEMerkleTree.toString())
console.log("Dados publicados")

function publish(topic, payload){
    const client  = mqtt.connect('ws://localhost:3031')

    client.on('connect', function () {
        client.publish(topic, payload, {qos: 2})
        client.end()
    })
}