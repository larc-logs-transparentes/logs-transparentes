import {getDataProof, getTrustedRoot} from '../endpoints/merkletree.api.js';
import {getBuById} from '../endpoints/bu.api.js';
import {initPyodide,formatProofDataToPython} from './pyodide.js';

export async function verifySingleData(id) {
    let bu = await getBuById(id);
    let root = await getTrustedRoot(); // get from trusted souce (monitor)
    let proofData = await getDataProof(bu.merkletree_leaf_index,bu.id_eleicao);
    // Some formatation necessary for pyodide
    formatProofDataToPython(proofData)
    root = JSON.stringify(root)
    proofData = JSON.stringify(proofData)
    let buInteiro = JSON.stringify(bu["bu_inteiro"])
    

    const pyodide = await initPyodide(); 
    const pythonCode = `
    from tlverifier.merkle_functions.tl_functions import verify_data_entry
    import requests
    import json
    def func():
      # Attempt to load and verify proofData
      try:
          proofData = str(${proofData})
          proofData = proofData.replace("'", '"')
          proofData = json.loads(proofData)
      except (json.JSONDecodeError, TypeError):
          return "Invalid format for proofData"
      try:
          bu = str(${buInteiro})
          bu = bytes(bu, 'utf-8')
      except ValueError:
          return "Invalid format for buInteiro"

      try:
          root = str(${root})
          root = root.replace("'", '"')
          root = json.loads(root)
      except (json.JSONDecodeError, TypeError):
          return "Invalid format for root"

      verifyresult = verify_data_entry(proofData, root["value"], bu)
      return str(verifyresult)
    func()
  `;
    return await pyodide.runPythonAsync(pythonCode);

}