import { getDataProof, getTrustedRoot } from '../endpoints/merkletree.api.js';
import { getBuById } from '../endpoints/bu.api.js';
import { initPyodide, formatProofDataToPython } from './pyodide.js';

export async function VerificationDragAndDrop(id,bu_teste) {

    let bu = await getBuById(id);
    console.log(bu)

    const merkletreeInfo = bu.merkletree_info[Object.keys(bu.merkletree_info)[0]];
    const treeName = merkletreeInfo.tree_name;
    const index = merkletreeInfo.index;
    const buId = bu._id;

    let proofData = await getDataProof(index, treeName, buId);
    let root = await getTrustedRoot();

    formatProofDataToPython(proofData);
    root = JSON.stringify(root);
    proofData = JSON.stringify(proofData);
    const buInteiro = JSON.stringify(bu_teste);
    console.log(buInteiro)
    const pyodide = await initPyodide();
    const pythonCode = `
    import json
    import base64
    from tlverifier.merkle_functions.tl_functions import verify_data_entry

    def verify_data():
        # Load and parse JSON data
        try:
            proofData = str(${proofData})
            proofData = proofData.replace("'", '"')
            proofData = json.loads(proofData)
        except (json.JSONDecodeError, TypeError):
            return "Invalid format for proofData"
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

        verify_result = verify_data_entry(proofData, root["value"], bu)
        return str(verify_result['success'])

    verify_data()
    `;
    return await pyodide.runPythonAsync(pythonCode);
}
