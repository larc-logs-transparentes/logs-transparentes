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
exports.findByIndexRange = async (initial_index, final_index) => {
    return await repository.find({merkletree_leaf_index:{ $gte:initial_index, $lte:final_index}})
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
exports.findDistinctTurno = async () => {
    return await repository.find().distinct("turno")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}
exports.findDistinctUF = async (turno) => {
    return await repository.find({ 'turno': turno }).distinct("UF")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}
exports.findDistinctZona = async (turno, uf) => {
    return await repository.find({ 'turno': turno, 'UF': uf }).distinct("zona")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}
exports.findDistinctSecao = async (turno, uf, zona) => {
    return await repository.find({ 'turno': turno, 'UF': uf, 'zona': zona }).distinct("secao")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}