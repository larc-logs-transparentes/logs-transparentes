const mongoose = require("mongoose");
// const url = 'mongodb://127.0.0.1:5432/bu_db';
// mongoose.connect(url)


const rootSchema = new mongoose.Schema({  
    _id: { type: Number},
    tree_size_1: Number,
    tree_size_2: Number,
    first_hash: String,
    second_hash: String,
    consistency_path: [],
    log_id: Number,
    ultimo:false,
});

const modeloroot = mongoose.model("roots",rootSchema) //"roots" = collection of database


module.exports = {modeloroot}