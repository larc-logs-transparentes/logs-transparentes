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
console.log("-- m = 3 --")
leaves = ['d0', 'd1', 'd2']
const MT = new MerkleTree(leaves.map(x => SHA256(x)), SHA256)
leaves = MT.getHexLeaves() 
consistencyProofData.tree_size_1 = 0;
consistencyProofData.tree_size_2 = 3;
consistencyProofData.first_hash = null
consistencyProofData.second_hash = MT.getHexRoot()
consistencyProofData.consistency_path = proof(0, MT.getHexLeaves())
consistencyProofData.log_id = 0 
publish("guilherme/teste", JSON.stringify(consistencyProofData))  

console.log("-- m = 7 --")
leaves = ['d3', 'd4', 'd5', 'd6']
MT.addLeaves(leaves.map(x => SHA256(x)))
consistencyProofData.tree_size_1 = 3
consistencyProofData.tree_size_2 = 7
consistencyProofData.first_hash = consistencyProofData.second_hash
consistencyProofData.second_hash = MT.getHexRoot()
consistencyProofData.consistency_path = proof(3, MT.getHexLeaves())
consistencyProofData.log_id = 1
publish("guilherme/teste", JSON.stringify(consistencyProofData))

console.log("-- m = 10 --")
leaves = ['d7', 'd8', 'd9']
MT.addLeaves(leaves.map(x => SHA256(x)))
consistencyProofData.tree_size_1 = 7
consistencyProofData.tree_size_2 = 10
consistencyProofData.first_hash = consistencyProofData.second_hash
consistencyProofData.second_hash = MT.getHexRoot()
consistencyProofData.consistency_path = proof(7, MT.getHexLeaves())
consistencyProofData.log_id = 2
consistencyProofData.ultimo = true
publish("guilherme/teste", JSON.stringify(consistencyProofData))

return

/**
* publish
* @desc - publica os dados contidos no payload no tópico correspondente
* @param {String} topic
* @param {any} payload - lista ordenada das n entradas da árvore
*/
function publish(topic, payload){
    const client  = mqtt.connect('ws://localhost:3030')
    client.on('connect', function () {
        client.publish(topic, payload, {qos: 2})
        client.end()
    })
}

/**
* proof
* @desc - retorna a lista de nós da Merkle Tree necessários para verificar que as m primeiras entradas D[0:m] são iguais em ambas as árvores.
* @param {Number} m - número de folhas da Merkle Tree anterior
* @param {String[]} D_n - lista ordenada das n entradas da árvore
* @return {String[]}
*/
function proof(m, D_n){
    if(m == 0)
        return D_n
    n = D_n.length
    if(m < n)
        return __subProof(m, D_n, true)
    return null
}

/**
* MTH
* @desc - calcula a raiz da Merkle Tree com as entradas D
* @param {String[]} D - lista ordenada de entradas
* @return {String}
*/
function MTH(D){
    n = D.length

    if (n == 1)
        return D[0]

    return new MerkleTree(D, SHA256).getHexRoot()
}

function __subProof(m, D, subTree){
    const path = []
    const n = D.length
    if (m == n) {
        if (!subTree)
            path.push(MTH(D))
        return path
    }
    if(m < n){
        const k = __maiorPot2MenorQue(n)
        if (m <= k){
            //a subárvore da direita D[k:n] só existe na árvore atual
            //então, temos que provar que a subárvore da esquerda D[0:k] é consistente
            path.push(__subProof(m, D.slice(0, k), subTree))
            //e adicionar ao pacote a ser enviado D[k:n] a subárvore da direita
            path.push(MTH(D.slice(k,n)))
        } else {
            //a subárvore da esquerda são idênticas em ambas as árvores 
            //Vamos provar que a subárvore da direita D[k:n] é consistente
            path.push(__subProof(m - k, D.slice(k,n), false))
            //e adicionar ao pacote a ser enviado D[0:k] a subárvore da esquerda
            path.push(MTH(D.slice(0,k)))
        }
    }
    return path.flat()
}

function __maiorPot2MenorQue(n){
    return Math.pow(2,parseInt(Math.log2(n-1)));
}
