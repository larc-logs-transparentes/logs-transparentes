import {getDataProof, getTrustedRoot,getAllRoots,getAllConsistencyProof,getAllLeafData,getLocalTreeList,getTreeResponse} from '../api/merkletree.api.js';
import {getBuById} from '../api/bu.api.js';
import {initPyodide,formatProofDataToPython} from './pyodide.js';
export async function SignedRoot(id) {
    let bu = await getBuById(id);
    let root = await getTrustedRoot(); // get from trusted souce (e.g., monitor)
    let allGlobalRoots = await getAllRoots(); 
    let allConsistencyProof = await getAllConsistencyProof(); 
    let allLeafData = await getAllLeafData();
    let proofData = await getDataProof(id);
    let localTreeList = await getLocalTreeList();
    let treeResponse = await getTreeResponse();
    // Some formatation necessary for pyodide
    formatProofDataToPython(proofData)
    root = JSON.stringify(root)
    allGlobalRoots = JSON.stringify(allGlobalRoots)
    allConsistencyProof = JSON.stringify(allConsistencyProof)
    proofData = JSON.stringify(proofData)
    localTreeList = JSON.stringify(localTreeList)
    let buInteiro = JSON.stringify(bu["bu_inteiro"])
    treeResponse = JSON.stringify(treeResponse)
    

    const pyodide = await initPyodide(); 
    const pythonCode = `
    import requests
    from tlverifier.merkle_functions.tl_functions import verify_global_tree_history_consistency, verify_local_tree_history_consistency
    import json
    import utils
    def main():
        latest_root = str(${root})
        
        # get all global roots. Those represents the roots that the monitor has stored locally
        trusted_global_roots = str(${allGlobalRoots})}) 
        
        global_tree_proofs = get_all_consistency_proof("global_tree")
        result = verify_global_tree_history_consistency(global_tree_proofs, trusted_global_roots)
        if(result["success"] == True):
            return str("Verify consistency on global tree: ok")
        else:
            return str("Verify consistency on global tree: Failed")
    
    
        global_tree_data = get_all_global_tree_leaf()
        tree_list = get_local_tree_list()
        for tree in tree_list:
            local_tree_proofs = get_all_consistency_proof(tree)
            result = verify_local_tree_history_consistency(global_tree_data, local_tree_proofs, latest_root["value"], tree)
            if(result["success"] == True):
                print(f"Verify consistency on {tree}: ok")
            else:
                print(f"Verify consistency on {tree}: Failed")

    def get_all_global_tree_leaf():
        all_leaf_response = str(${allLeafData})}) 
        all_leaf = json.loads(all_leaf_response.text)
        return all_leaf

    def remove_empty_trees(tree_list):
        for tree in tree_list:
            tree_response = str(${treeResponse})}
            tree_info = json.loads(tree_response.text)

            if (tree_info["length"] == 0):
                tree_list.remove(tree)

        return tree_list

    def get_local_tree_list():
        tree_list_response = str(${localTreeList})})
        tree_list = json.loads(tree_list_response.text)["trees"]
        tree_list.remove('global_tree')
        tree_list = remove_empty_trees(tree_list)
        return tree_list

    if __name__ == "__main__":
        main()
  `;
    return await pyodide.runPythonAsync(pythonCode);
}