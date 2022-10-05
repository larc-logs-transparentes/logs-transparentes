const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

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

    return new MerkleTree(D, SHA256).getRoot().toString('hex')
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

module.exports = { proof }