const tlmanager_adapter = require("../adapters/tlmanager.adapter");
const bu_repository = require("../database/repository/bu.repository");
const config = require("../config.json");

exports.create = async (tree_name, data) => {
    console.debug(`[bu.service] Inserting bu with id: ${data.id}`)

    let merkletree_leaf_data = null
    try {
        merkletree_leaf_data = await tlmanager_adapter.addLeaf(tree_name, data.bu_inteiro)
    } catch (error) {
        console.error(`[bu.service] Error while adding leaf to merkletree: ${error}`)
        throw new Error(`[bu.service] Error while adding leaf to merkletree: ${error}`)
    }

    console.debug(`[bu.service] merkletree_leaf_data: ${JSON.stringify(merkletree_leaf_data)}`)
    
    bu_repository.create({
        id_eleicao: data.id_eleicao,
        UF: data.UF,
        zona: data.zona,
        secao: data.secao,
        bu_inteiro: JSON.stringify(data.bu_inteiro),
        merkletree_leaf_index: Number(merkletree_leaf_data.index),
        merkletree_leaf: merkletree_leaf_data.value,
    }).then((saved_bu) => {
        console.debug(`[bu.service] bu with id ${saved_bu._id} saved, http://localhost:8080/bu/find_by_id?id=${saved_bu._id}`)
    })

    return merkletree_leaf_data
}