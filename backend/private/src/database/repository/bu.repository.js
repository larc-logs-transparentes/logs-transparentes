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
    return await repository.findOne({ _id: id })
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findByMerkletreeIndexRange = async (id_eleicao, initial_index, final_index) => {
    return await repository.find({id_eleicao: id_eleicao, merkletree_leaf_index:{ $gte:initial_index, $lte:final_index}})
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

exports.findByInfo = async (id_eleicao, UF, zona, secao) => {
    return await repository.findOne({ id_eleicao: id_eleicao, UF: UF, zona: zona, secao: secao })
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findDistinctEleicoes = async () => {
    return await repository.find().distinct("id_eleicao")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}
exports.findDistinctUF = async (id_eleicao) => {
    return await repository.find({ 'id_eleicao': id_eleicao }).distinct("UF")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}
exports.findDistinctZona = async (id_eleicao, uf) => {
    return await repository.find({ 'id_eleicao': id_eleicao, 'UF': uf }).distinct("zona")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}
exports.findDistinctSecao = async (id_eleicao, uf, zona) => {
    return await repository.find({ 'id_eleicao': id_eleicao, 'UF': uf, 'zona': zona }).distinct("secao")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}