const { MerkleTree }  = require("merkletreejs");
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
    return new MerkleTree(leaves.map((leaf) => SHA256(leaf)), SHA256, {fillDefaultHashes: true}).getRoot().toString('hex')
}

const leaves = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"];
const merkleTree = new MerkleTree(leaves.map((leaf) => SHA256(leaf)), SHA256, {fillDefaultHashes: true});

leaves.map((leaf) => {console.log(`${leaf} ==> ${SHA256(leaf).toString()}`);})
console.log()
merkleTree.print()
console.log("Prova de resultado - 2 a 6")
console.log(nodeKeys(leaves, 2, 6))
console.log("Prova de resultado - 4 a 7")
console.log(nodeKeys(leaves, 4, 7))
console.log("Prova de resultado - 0 a 1")
console.log(nodeKeys(leaves, 0, 1))