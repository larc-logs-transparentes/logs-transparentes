const mongoose = require("mongoose");
const { schema_election_data } = require("../models/election-data.model")


exports.findById = async (data_name, id) => {
    const repository = mongoose.model(data_name, schema_election_data, data_name);
    return await repository.findOne({ _id: id })
    .then((data) => {
        data._doc.data = Buffer.from(data.data, 'base64').toString('base64')
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][election-data.repository] ${err}`)
    })
}

exports.findByMerkletreeIndexRange = async (data_name, initial_index, final_index) => {
    const repository = mongoose.model(data_name, schema_election_data, data_name);
    return await repository.find({ "merkletree_info.index": { $gte: parseInt(initial_index), $lte: parseInt(final_index) } }, { data: 0 })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error(`[ERROR][election-data.repository] ${err}`);
        });
};