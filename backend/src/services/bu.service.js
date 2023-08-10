const tlmanager_adapter = require("../adapters/tlmanager.adapter");
const bu_repository = require("../database/repository/bu.repository");
const config = require("../config.json");

exports.create = async (tree_name, data) => {
    console.debug(`[bu.service] Inserting bu with id: ${data.id}`)

    const merkletree_leaf_data = await tlmanager_adapter.addLeaf(tree_name, data.bu_inteiro)
    console.debug(`[bu.service] merkletree_leaf_data: ${JSON.stringify(merkletree_leaf_data)}`)

    bu_repository.create({
        id: data.id,
        turno: data.turno,
        UF: data.UF,
        zona: data.zona,
        secao: data.secao,
        cidade: data.cidade,
        bu_inteiro: JSON.stringify(data.bu_inteiro),
        votos: data.votos,
        merkletree_leaf_index: merkletree_leaf_data.index,
        merkletree_leaf: merkletree_leaf_data.value,
    })

    console.debug(`[bu.service] bu with id ${data.id} saved, http://localhost:8080/bu/find_by_id?id=${data.id}`)
    return merkletree_leaf_data
}