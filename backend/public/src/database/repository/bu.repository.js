const mongoose = require("mongoose");
const { schema_bu } = require("../models/bu.model")

const repository = mongoose.model("bu", schema_bu) //"bu" = collection of database

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

exports.findByInfo = async (id_eleicao, UF, municipio, zona, secao) => {
    return await repository.findOne({ id_eleicao: id_eleicao, UF: UF, zona: zona, municipio:municipio, secao: secao })
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

exports.findDistinctMunicipio = async (id_eleicao, uf) => {
    return await repository.find({ 'id_eleicao': id_eleicao, 'UF': uf }).distinct("municipio")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findDistinctZona = async (id_eleicao, uf, municipio) => {
    return await repository.find({ 'id_eleicao': id_eleicao, 'UF': uf, 'municipio': municipio }).distinct("zona")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    }
)}

exports.findDistinctSecao = async (id_eleicao, uf, zona, municipio) => {
    return await repository.find({ 'id_eleicao': id_eleicao, 'UF': uf,'municipio':municipio, 'zona': zona }).distinct("secao")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}