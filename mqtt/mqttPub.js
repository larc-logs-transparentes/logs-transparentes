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
for (const key in leaves) 
    console.log(`${leaves[key]} ${SHA256(leaves[key])}`)
console.log("------")
const MT = new MerkleTree(leaves.map(x => SHA256(x)), SHA256)
aux = MT.getLeaves()
MT.print()
console.log("-- m = 3 --")
console.log(proof(3, aux))
consistencyProofData.tree_size = MT.getLeafCount()
consistencyProofData.tree_hash = MT.getRoot()
consistencyProofData.consistency_path = proof(3, aux)

console.log("-- m = 4 --")
console.log(proof(4, aux))
console.log("-- m = 6 --")
console.log(proof(6, aux))



function publish(topic, payload){
    const client  = mqtt.connect('ws://localhost:3031')

    client.on('connect', function () {
        client.publish(topic, payload, {qos: 2})
        client.end()
    })
}

/**
* proof
* @desc 
* @param {Number} m - previous Merkle Tree number of leaves
* @param {Buffer[]} D_n - ordered list of n inputs to the tree
* @return {Buffer[]}
* @example
*```js
*const leaves = tree.getLeaves()
*```
*/
function proof(m, D){
    n = D.length
    if(0 < m && m < n)
        return __subProof(m, D, true)
    return null
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
        k = maiorPot2MenorQue(n)
        if (m <= k){
            //a subárvore da direita D[k:n] só existe na árvore atual
            //então, temos que provar que a subárvore da esquerda D[0:k]  
            path.push(__subProof(m, D.slice(0, k), subTree))
            //e adicionar ao pacote a ser enviado D[k:n]
            path.push(MTH(D.slice(k,n)))
        } else {
            //a subárvore da esquerda são idênticas em ambas as árvores 
            //Vamos provar que a subárvore da direita D[k:n] são consistentes
            path.push(__subProof(m - k, D.slice(k, n), false))
            //e adicionar ao pacote a ser enviado D[0:k]
            path.push(MTH(D.slice(0,k)))
        }
    }
    return path.flat()
}

function MTH(D){
    n = D.length
    if (n == 0)
        return SHA256(null).toString()
    if (n == 1){
        var h = [0x00, D[0]]
        return SHA256(Buffer.concat(h)).toString()
    }

    k = maiorPot2MenorQue(n)

    var c = []
    c[0] =  0x01
    x = MTH(D.slice(0, k))
    c.concat(x)
    x = MTH(D.slice(k, n))
    c.concat(x)
    return SHA256(c).toString()
}

function maiorPot2MenorQue(n){
    /* if (n < 2)
        return 0
    t = 0
    for (let i = 0; i < 64; i++) {
        c = 1 << i;
        if (c > n-1)
            return t
        t = c
    }
    return 0 
     */
    return Math.pow(2,parseInt(Math.log2(n-1)));
}
