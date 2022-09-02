const express = require('express')
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
var bodyParser = require('body-parser');

// TODO: throtling
// TODO: alguma otimizaçao para assinar a raiz (lru cache, ou assinar a cada X minutos)
// TODO: 2 ataques na lib do merkltreejs (fork) -> prof simplicio vai explicar como corrige
const app = express()
app.use(express.json())
const port = 3001
//mudar a funcao de hash
const tree = new MerkleTree([], SHA256)


app.get('/', (req, res) => {
  res.send('Hello World!' + tree.toString())
})


app.put('/', (req, res) => {
  console.log(req.body)
  
  console.log(req.body.leaves)
  //const leaves = req.leaves 
  //tree.addLeaves(leaves)
  res.json(req.body);
})

app.post('/', (req, res) => {
  console.log(req.body)
  console.log(req.body.leaves)
  const leaves = req.body.leaves 
  tree.addLeaves(leaves.map(x => SHA256(x)))
  console.log(tree.toString())
  res.json(req.body);
})

app.post('/tree/leaf', (req, res) => {
  console.log(req.body)
  // console.log(req.body.leaf)
  const leaf = req.body.leaf 
  const leafString = JSON.stringify(req.body.leaf)
  console.log({leafString})
  tree.addLeaf(SHA256(leafString))
  const leaf_index = tree.getLeafIndex(SHA256(leafString))
  const added_leaf = tree.getLeaf(leaf_index).toString('hex')
  console.log({leaf_index})
  console.log({added_leaf})
  res.json({
    "leaf_index": leaf_index,
    "added_leaf": added_leaf,
    ...req.body
  });
})


app.post('/proof', (req, res) => {
  // returns proof
  const root = tree.getRoot().toString('hex')
  const leaf = SHA256(req.body.leaf)
  const proof = tree.getProof(leaf)
  if (tree.verify(proof, leaf, root)){
    res.json(proof)
  }
  else{
    res.send('Proof not found' + tree.toString())
  }
})

// TODO: precisa definir se sera esse formato de retorno
// tree.getLayersAsObject() ou tree.getHexLayersFlat() tambem podem ser uma opçao 
app.get('/tree', (req, res) => {
  console.log(tree.toString())
  console.log("tree leaves: ", tree.getLeafCount())
  console.log(tree.getHexLayersFlat())
  res.send(tree.getHexLayers())
})

app.get('/tree/root', (req, res) => {
  // TODO: em vez de hexa usar base64
  const root = tree.getRoot().toString('hex')
  console.log(root)
  res.send(root)
})

app.get('/tree/proof/:m', (req, res) => {
  console.log(`Prova de consistência com m = ${req.params.m}`)
  res.send(proof(req.params.m, tree.getHexLeaves()))
})

app.get('/tree/leaf/:id', (req, res) => {
  // Return a leaf with id equals to id and its proof.
  const leaf = tree.getLeaf(req.params.id).toString('hex')
  const root = tree.getRoot()
  const proofHex = tree.getHexProof(leaf)
  const proof = tree.getProof(leaf)
  console.log(proof)
  console.log(tree.verify(proof, leaf, root))
  res.send({
    "id": req.params.id,
    "leaf": leaf,
    "proof": proof,
    "proofHex": proofHex
  })
})

app.get('/leaf/:id', (req, res) => {
  // Return a leaf with id equals to id without its proof.
  const leaf = tree.getLeaf(req.params.id).toString('hex')
  console.log(leaf)
  res.send({
    "id": req.params.id,
    "leaf": leaf,
  })
})

app.get('/tree/leaves', (req, res) => {
  const leaves = tree.getHexLeaves()
  console.log(leaves)
  res.send(leaves.map(leaf => {return {"hash": leaf}}))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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
