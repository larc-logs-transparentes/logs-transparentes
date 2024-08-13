import { getDataProof, getTrustedRoot } from '../endpoints/merkletree.api.js';
import { getBuById } from '../endpoints/bu.api.js';
import { initPyodide, formatDataProofToPython } from './pyodide.js';

export async function verifySingleData(id) {

    let bu = await getBuById(id);
    console.log(bu)

    let dataProof = await getDataProofFromBU(bu)
    console.log(dataProof)
    let root = await getTrustedRoot();

    formatDataProofToPython(dataProof);
    root = JSON.stringify(root);
    dataProof = JSON.stringify(dataProof);
    const buInteiro = JSON.stringify(bu["bu"]);
    const pyodide = await initPyodide();
    const pythonCode = `
    import json
    import base64
    from tlverifier.merkle_functions.tl_functions import verify_data_entry

    def verify_data():
        # Load and parse JSON data
        try:
            dataProof = str(${dataProof})
            dataProof = dataProof.replace("'", '"')
            dataProof = json.loads(dataProof)
        except (json.JSONDecodeError, TypeError):
            return "Invalid format for dataProof"

        try:
            bu = str(${buInteiro})
            bu = base64.b64decode(bu)
        except ValueError:
            return "Invalid format for buInteiro"

        try:
            root = str(${root})
            root = root.replace("'", '"')
            root = json.loads(root)
        except (json.JSONDecodeError, TypeError):
            return "Invalid format for root"

        verify_result = verify_data_entry(dataProof, root["value"], bu)
        return str(verify_result['success'])

    verify_data()
    `;
    return await pyodide.runPythonAsync(pythonCode);
}

export async function getDataProofFromBU(bu){
    const merkletreeInfo = bu.merkletree_info[Object.keys(bu.merkletree_info)[0]];
    const treeName = merkletreeInfo.tree_name;
    const index = merkletreeInfo.index;
    const buId = bu._id;

    const dataProof = await getDataProof(index, treeName, buId);
    return dataProof;
}