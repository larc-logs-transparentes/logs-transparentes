const db = require("../models");
const merkletree_adapter = require("../adapters/merkletree.adapter")

const BU = db.bu;
const Op = db.Sequelize.Op;

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

// Update a BU by the id in the request
exports.update = (req, res) => {
  
};

// Delete a BU with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all BUs from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published BUs
exports.findAllPublished = (req, res) => {
  
};