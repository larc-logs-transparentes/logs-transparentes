import county_codes from './assets/county_codes.json';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const BU_FILES_PATH = './results';
const BU_TREE_PREFIX = 'bu_tree_';
const BACKEND_URL = 'http://localhost:8080';


const send_bu_to_backend = async (tree, bu) => {
    axios.post(BACKEND_URL + '/bu/create', {
        "tree_name": tree,
        "data": bu
    })
}

const create_tree = async (tree_name, commitment_size) => {
    axios.post(BACKEND_URL + '/tree/create_tree', {
        "tree_name": tree_name,
        "commitment_size": commitment_size
    })
}

const commit_tree = async (tree_name) => {
    axios.post(BACKEND_URL + '/tree/commit', {
        "tree_name": tree_name
    })
}

const bu_files_path = () => {
    try {
        const files = fs.readdirSync(bu_files_path);
        return files.map(file => path.join(bu_files_path, file));
    } catch (err) {
        console.info(`No files found in ${bu_files_path}, reading example files`); 
        return ['./assets/example_bus_consolidated.json'];
    }
}

const send_bus_to_backend = async () => {
    const files = bu_files_path();
    for (const file of files) {
        const bu_file = fs.readFileSync(file);
        const bu = JSON.parse(bu_file);
        const tree_name = BU_TREE_PREFIX + path.basename(file, '.json');
        await create_tree(tree_name, 1);
        await send_bu_to_backend(tree_name, bu);
        await commit_tree(tree_name);
    }

}
    

const parse_bu_for_election = (bu) => {
    /* Common values for each election */
    const zona = bu['identificacaoSecao']['municipioZona']['zona']
    const secao = bu['identificacaoSecao']['secao']
    const cod_municipio = bu['identificacaoSecao']['municipioZona']['municipio']
    const municipio = get_municipio_from_code(cod_municipio)
    const uf = municipio['uf']
    const nome_municipio = municipio['nome_municipio']

    /* Object for each election */
    const elections = []
    for (let election in bu['resultadosVotacaoPorEleicao']) {
        const id_eleicao = election['idEleicao']

        elections.push({
            "id_eleicao": id_eleicao,
            "UF": uf,
            "zona": zona,
            "secao": secao,
            "municipio": nome_municipio,
            "bu_inteiro": bu,
        })
    }
    return elections
}

const get_municipio_from_code = (cod_municipio) => {
    for (const county_code in county_codes) 
        if (county_code === cod_municipio) 
            return county_codes[county_code]

    return {
        "codigo_tse": cod_municipio,
        "uf":"ZZ",
        "nome_municipio":"Exterior",
        "capital": null,
        "codigo_ibge": null
    }
}