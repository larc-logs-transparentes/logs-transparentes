import {getRoot,getDataProof,getBuById, getTrustedRoot} from './services.js';
import initPyodide from './pyodide.js';
export async function verifySingleData(id){
    const pyodide = await initPyodide();
  
    const pythonCode = `
    from tlverifier.merkle_functions.tl_functions import verify_single_data
    import requests
    import json
    def func():
      proofData=(${await getDataProof(id)})
      #Definindo true do javascript como True do python
      #proofData['local_tree']['inclusion_proof']['metadata']['security']=True
      #proofData['data']['inclusion_proof']['metadata']['security']=True
      bu=${await getBuById(id)}
      verifydata =verify_single_data(proofData, ${await getTrustedRoot()},bu['bu_inteiro'])
      return verifydata
    func()
  `;

    return await pyodide.runPythonAsync(pythonCode);}