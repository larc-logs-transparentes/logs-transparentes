const mongoose = require("mongoose");

const merkletree_info = new mongoose.Schema({
    tree_name: String,
    index: Number,
    hash: String,
});

module.exports = { merkletree_info }