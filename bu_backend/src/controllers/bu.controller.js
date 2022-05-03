const db = require("../models");
const merkletree_adapter = require("../adapters/merkletree.adapter")

const BU = db.bu;

// Create and Save a new BU
exports.create = (data) => {
  console.log({"BU": data})
  return merkletree_adapter.addLeaf(data).then((merkletree_data) => {
    BU.create({
      merkletree_leaf_id: merkletree_data.leaf_index,
      merkletree_leaf: merkletree_data.added_leaf,
      ...data
    })
  })
};

// Create and Save a new BU
exports.createString = (data) => {
  buString = data.turno + data.secao + data.zona + data.UF
  console.log(buString)
  console.log({"BU": data})
  return merkletree_adapter.addLeaf(buString).then((merkletree_data) => {
    BU.create({
      merkletree_leaf_id: merkletree_data.leaf_index,
      merkletree_leaf: merkletree_data.added_leaf,
      ...data
    })
  })
};


// Retrieve all BUs from the database.
exports.findAll = () => {
  return BU.findAll({}).then((data) => {
    return data
  })
};

// Find a single BU with an id
exports.findById = (id) => {
  console.log({id})
  return BU.findByPk(id).then((data) => {
    return data
  })
};

// Find BU by BU info
exports.findByInfo = (turno, uf, zona, secao) => {
  console.log("findByInfo")
  return BU.findOne({
    where: {
      turno: turno,
      secao: secao,
      zona: zona,
      UF: uf
    }
  }).then((data) => {
    return data
  })
};