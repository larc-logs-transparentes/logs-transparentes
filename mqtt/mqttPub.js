const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const mqtt = require('mqtt')

let consistencyProofData = {
    tree_size: null,
    tree_hash: null,
    consistency_path: [],
    log_id: 0,
    last: false,
}

/* ------------------------- 1º envio ------------------------------ */

leaves = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6']
/* for (const key in leaves) 
    console.log(`${leaves[key]} ${SHA256(leaves[key])}`)
console.log("------") */
const MT = new MerkleTree(leaves.map(x => SHA256(x)), SHA256)
leaves = MT.getLeaves()
MT.print()
console.log("-- m = 3 --")
console.log(proof(3, leaves))
console.log("-- m = 4 --")
console.log(proof(4, leaves))
console.log("-- m = 6 --")
console.log(proof(6, leaves))

/**
* publish
* @desc - publica os dados contidos no payload no tópico correspondente
* @param {String} topic
* @param {any} payload - lista ordenada das n entradas da árvore
*/
function publish(topic, payload){
    const client  = mqtt.connect('ws://localhost:3031')
    client.on('connect', function () {
        client.publish(topic, payload, {qos: 2})
        client.end()
    })
}

/**
* proof
* @desc - retorna a lista de nós da Merkle Tree necessários para verificar que as m primeiras entradas D[0:m] são iguais em ambas as árvores.
* @param {Number} m - número de folhas da Merkle Tree anterior
* @param {Buffer[]} D_n - lista ordenada das n entradas da árvore
* @return {Buffer[]}
*/
function proof(m, D){
    n = D.length
    if(0 < m && m < n)
        
    return __subProof(m, D, true)
    return null
}

/**
* MTH
* @desc - calcula a raiz da Merkle Tree com as entradas D
* @param {Buffer[]} D - lista ordenada de entradas
* @return {Buffer}
*/
function MTH(D){
    n = D.length

    if (n == 0)
        return SHA256(null).toString()
    if (n == 1)
        return D[0]

    return new MerkleTree(D, SHA256).getRoot()
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
