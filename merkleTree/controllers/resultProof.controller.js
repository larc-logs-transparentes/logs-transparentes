const { MerkleTreePrefix } = require('../merkletreejs/dist/MerkleTreePrefix')
const SHA256 = require("crypto-js/sha256");

function nodeKeys(leaves, i_inicial, i_final) {
    return __nodeKeys(leaves, i_inicial, i_final, 0, 0)
}

function __nodeKeys(leaves, i_inicial, i_final, depth, index){
    const nodes = []
    const n = leaves.length
    if (n == 1 || (i_inicial == 0 && i_final == n - 1)) 
        return{depth: depth, index: index, hash: MTH(leaves)}

    const p = largerPowerOfTwoLessThan(n)
    if(i_inicial < p)
        nodes.push(__nodeKeys(leaves.slice(0, p), i_inicial, Math.min(i_final, p - 1), depth + 1, index * 2))
    if(i_final >= p)
        nodes.push(__nodeKeys(leaves.slice(p, n), Math.max(i_inicial, p) - p, i_final - p, depth + 1, index * 2 + 1))
    
    return nodes.flat()
}

function largerPowerOfTwoLessThan(n) {
    return Math.pow(2,parseInt(Math.log2(n-1)));
}

function MTH(leaves){
    return new MerkleTreePrefix(leaves, SHA256, {fillDefaultHashes: true}).getRoot().toString('hex')
}

module.exports = { nodeKeys }