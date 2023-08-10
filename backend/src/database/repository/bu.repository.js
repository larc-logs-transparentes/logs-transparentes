const mongoose = require("mongoose");
const { schema_bu } = require("../models/bu.model")

const repository = mongoose.model("bu", schema_bu) //"bu" = collection of database

exports.create = async (bu) => {
    return await repository.create(bu)
    .then(() => {
        console.info(`[bu.repository] bu with id ${bu.id} saved`)
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findAll = async () => {
    return await repository.find()
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findById = async (id) => {    
    return await repository.findOne({ id: id })
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findByIdRange = async (initial_id, final_id) => {
    return await repository.find({id:{ $gte:initial_id, $lte:final_id}})
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findByInfo = async (turno, UF, zona, secao) => {
    return await repository.findOne({ turno: turno, UF: UF, zona: zona, secao: secao })
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

