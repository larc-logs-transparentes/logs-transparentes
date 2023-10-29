const mongoose = require("mongoose");
const { schema_bu } = require("../models/bu.model")

const repository = mongoose.model("bu", schema_bu) //"bu" = collection of database

exports.create = async (bu) => {
    return await repository.create(bu)
    .then((saved_bu) => {
        console.info(`[bu.repository] bu with id ${saved_bu._id} saved`)
        return saved_bu
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}