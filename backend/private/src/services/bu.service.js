const tlmanager_adapter = require("../adapters/tlmanager.adapter");
const bu_repository = require("../database/repository/bu.repository");
const county_codes = require("../assets/county_codes_hash.json");
const bu_tree_info = require("../config.json").tlmanager_config.bu_tree_info

/*
* This function search for the county in the county_codes.json file and returns if it is found
* If it is not found, it returns a default object with uf = 'ZZ' and municipio = 'Externo'
*/
const getUfAndMunicipioFromCod = (cod_municipio) => {

    try {
        return county_codes[cod_municipio]
    } catch (error) {
        return {
            codigo_tse: cod_municipio,
            uf: 'ZZ',
            nome_municipio: 'Externo'
        }
    }

}

/*
* This function receives a bu and returns an array of objects containing one object for each election
* An election object contains the id of the election, informations that identify the bu ("zona", "secao"
*  and "municipio") and the bu itself
*/
const retrieveElectionObjectFromBu = (bu) => {
    const zona = bu['identificacaoSecao']['municipioZona']['zona']
    const secao = bu['identificacaoSecao']['secao']

    const cod_municipio = bu['identificacaoSecao']['municipioZona']['municipio']
    const county = getUfAndMunicipioFromCod(cod_municipio)

    const eleicoes = []
    bu['resultadosVotacaoPorEleicao'].forEach((eleicao) => {
        eleicoes.push({
            id_eleicao: eleicao['idEleicao'],
            UF: county['uf'],
            zona: zona,
            secao: secao,
            municipio: county['nome_municipio'],
            bu_inteiro: JSON.stringify(bu)
        })
    })

    return eleicoes
}

exports.create = async (bu) => {
    const eleicoes = retrieveElectionObjectFromBu(bu)
    for (const eleicao of eleicoes) {
        let merkle_tree_leaf_data = await tlmanager_adapter.addLeaf(bu_tree_info.prefix + eleicao['id_eleicao'], eleicao.bu_inteiro)
        if (merkle_tree_leaf_data === undefined) {
            await tlmanager_adapter.createTree(bu_tree_info.prefix + eleicao['id_eleicao'], bu_tree_info.commitment_size)
            merkle_tree_leaf_data = await tlmanager_adapter.addLeaf(bu_tree_info.prefix + eleicao['id_eleicao'], eleicao.bu_inteiro)
        }
        console.debug(`[bu.service] merkle_tree_leaf_data: ${JSON.stringify(merkle_tree_leaf_data)}`)

        await bu_repository.create({
            ...eleicao,
            merkletree_leaf_index: Number(merkle_tree_leaf_data.index),
            merkletree_leaf: merkle_tree_leaf_data.value,
        })
    }

    return {
        status: "success",
        message: "BU inserted successfully"
    }
}
