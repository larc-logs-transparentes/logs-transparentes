const merkletree_adapter = require("../adapters/bus_tlmanager.adapter");
const { insertBU } = require("./db_bu.controller");

// Create and Save a new BU
exports.create = (tree_name, data) => {
  buString = JSON.stringify(data.bu_inteiro)
  console.log(typeof buString);
  console.log("Debug BU")
  console.log(buString)
  console.log({"BU": data})

  this.addLeaf(tree_name, buString).then((merkletree_data) => {
    insertBU(data, merkletree_data)
  })
  return
};

/* TLManager */
/* Admin functions */
exports.addLeaf = async (tree_name, data) => {
  return await merkletree_adapter.addLeaf(tree_name, data)
}

exports.createTree = async (tree_name, commitment_size) => {
  return await merkletree_adapter.createTree(tree_name, commitment_size)
}

exports.commit = async (tree_name) => {
  return await merkletree_adapter.commit(tree_name)
}

/* Tree functions */
exports.getTree = async (tree_name) => {
  return await merkletree_adapter.getTree(tree_name)
}

exports.getTreeRoot = async (tree_name) => {
  return await merkletree_adapter.getTreeRoot(tree_name)
}

/* Proofs routes */
exports.getConsistencyProof = async (tree_name) => {
  return await merkletree_adapter.getConsistencyProof(tree_name)
}

exports.getDataProof = async (tree_name, leaf_index) => {
  return await merkletree_adapter.getDataProof(tree_name, leaf_index)
}

exports.getInclusionProof = async (tree_name, leaf_index) => {
  return await merkletree_adapter.getInclusionProof(tree_name, leaf_index)
}
