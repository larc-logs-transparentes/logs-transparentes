import {getDataProof, getTrustedRoot,getAllRoots,getAllConsistencyProof,getLocalTreeList,getTreeResponse} from '../api/merkletree.api.js';
import {getBuById} from '../api/bu.api.js';
import {initPyodide,formatConsistencyProofToPython} from './pyodide.js';
export async function verifyRootHistoryConsistency() {
    let root = await getTrustedRoot(); // get from trusted souce (monitor)
    let allGlobalRoots = await getAllRoots(); 
    let allConsistencyProof = await getAllConsistencyProof();
    //Adding the second value to the first null value in order for it not to return any errors (the first value is always ignored anyway)
    allConsistencyProof.proofs[0].consistency_proof=allConsistencyProof.proofs[1].consistency_proof
    console.log(allConsistencyProof)
    allConsistencyProof= await formatConsistencyProofToPython(allConsistencyProof)
    console.log(allConsistencyProof)
    root = JSON.stringify(root)
    allGlobalRoots = JSON.stringify(allGlobalRoots)
    allConsistencyProof =JSON.stringify(allConsistencyProof)
    console.log(allConsistencyProof)

    const pyodide = await initPyodide(); 
    const pythonCode = `
    import requests
    from tlverifier.merkle_functions.tl_functions import verify_global_tree_history_consistency, verify_local_tree_history_consistency
    import json
    def func():
        latest_root = str(${root})
        latest_root = latest_root.replace("'",'"')
        latest_root = json.loads(latest_root)

        # get all global roots. Those represents the roots that the monitor has stored locally
        trusted_global_roots = str(${allGlobalRoots}) 
        trusted_global_roots = trusted_global_roots.replace("'",'"')
        trusted_global_roots = json.loads(trusted_global_roots)
        
        global_tree_proofs = str(${allConsistencyProof})
        global_tree_proofs = global_tree_proofs.replace("'",'"')
        global_tree_proofs = json.loads(global_tree_proofs)
        result = verify_global_tree_history_consistency(global_tree_proofs, trusted_global_roots)
        if(result["success"] == True):
            return 'success'
        else:
            return 'error'
    
    
    
    func()
  `;

    return await pyodide.runPythonAsync(pythonCode);
}