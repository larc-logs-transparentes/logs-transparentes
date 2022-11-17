const { SHA256 } = require("crypto-js");
const { MerkleTree }  = require("merkletreejs");

const leaves = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"];
const merkleTree = new MerkleTree(leaves.map((leaf) => SHA256(leaf)), SHA256, {fillDefaultHashes: true});

leaves.map((leaf) => {console.log(`${leaf} ==> ${SHA256(leaf).toString()}`);})
console.log()
merkleTree.print()
console.log()
console.log(nodeKeys(leaves, 2, 6))
console.log()
console.log(nodeKeys(leaves, 4, 7))
console.log()
console.log(nodeKeys(leaves, 0, 1))


function nodeKeys(leaves, i_inicial, i_final) {
    return __nodeKeys(leaves, i_inicial, i_final)
}

function __nodeKeys(leaves, i_inicial, i_final){
    const nodes = []
    const n = leaves.length
    if (n == 1 || (i_inicial == 0 && i_final == n - 1)) 
        return MTH(leaves)
        
    const p = largerPowerOfTwoLessThan(n)
    if(i_inicial < p)
        nodes.push(__nodeKeys(leaves.slice(0, p), i_inicial, Math.min(i_final, p - 1)))
    if(i_final >= p)
        nodes.push(__nodeKeys(leaves.slice(p, n), Math.max(i_inicial, p) - p, i_final - p))
    
    return nodes.flat()
}

function largerPowerOfTwoLessThan(n) {
    return Math.pow(2,parseInt(Math.log2(n-1)));
}

function MTH(leaves){
    return new MerkleTree(leaves.map((leaf) => SHA256(leaf)), SHA256, {fillDefaultHashes: true}).getRoot().toString('hex')
}