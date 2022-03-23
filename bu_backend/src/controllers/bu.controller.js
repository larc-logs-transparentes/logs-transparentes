const db = require("../models");

// TODO: problema pois db.bu é undefined
const BU = db.bu;
const Op = db.Sequelize.Op;
// Create and Save a new BU
exports.create = (req, res) => {
  console.log(req)
  //   BU.create(req)
};
// Retrieve all BUs from the database.
exports.findAll = (req, res) => {
  console.log(db)
  const all_bus = BU.findAll()
  console.log(all_bus)
  return all_bus
};
// Find a single BU with an id
exports.findOne = (req, res) => {
  
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