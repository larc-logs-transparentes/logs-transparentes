import {getDataProof, getTrustedRoot} from '../api/merkletree.api.js';
import {getBuById} from '../api/bu.api.js';
import {initPyodide,formatProofDataToPython} from './pyodide.js';
export async function verifySingleData(id){
    let bubyid=await getBuById(id);
    let root=await getTrustedRoot();
    let proofData=await getDataProof(id);

    formatProofDataToPython(proofData)
    
    // JSON.stringify's e str's em excesso são necessarios pelo pyodide
    const pyodide = await initPyodide();
    root = JSON.stringify(root)
    proofData = JSON.stringify(proofData)
    let buInteiro = JSON.stringify(bubyid["bu_inteiro"])

    
    const pythonCode = `
    from tlverifier.merkle_functions.tl_functions import verify_single_data
    import requests
    import json
    def func():
      proofData=str(${proofData})
      proofData=proofData.replace("'",'"') 
      proofData=json.loads(proofData)

      # Definindo true do javascript como True do python
      if proofData['local_tree']['inclusion_proof']['metadata']['security'] == 'True':
        proofData['local_tree']['inclusion_proof']['metadata']['security'] = True
      else:
        proofData['local_tree']['inclusion_proof']['metadata']['security'] = False
      if proofData['data']['inclusion_proof']['metadata']['security'] == 'True':
        proofData['data']['inclusion_proof']['metadata']['security'] = True
      else:
        proofData['data']['inclusion_proof']['metadata']['security'] = False

      bu=str(${buInteiro})
      #bu=bu.replace("'",'@')
      #bu=bu.replace('"',"'")
      #bu=bu.replace("@",'"')
      #bu=json.loads(bu)
      root=str(${root})
      root=root.replace("'",'"') 
      root=json.loads(root)
      verifyresult =verify_single_data(proofData, root['value'],bytes(bu,'utf-8'))
      return str(verifyresult["success"])
    func()
  `;
    return await pyodide.runPythonAsync(pythonCode);}