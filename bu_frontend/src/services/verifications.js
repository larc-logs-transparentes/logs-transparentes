import {getRoot,getDataProof,getBuById, getTrustedRoot,initPyodide} from './services.js';
export async function verifySingleData(id){
    const pyodide = await initPyodide();
  
    const pythonCode = `
    from tlverifier.merkle_functions.tl_functions import verify_single_data
    import requests
    import json
    def func():
      #proofData=(${getDataProof(id)})
      #Definindo true do javascript como True do python
      #proofData['local_tree']['inclusion_proof']['metadata']['security']=True
      #proofData['data']['inclusion_proof']['metadata']['security']=True
      #bu=${getBuById(id)}
      verifydata = True #verify_single_data(proofData, ${getTrustedRoot()},str({bu['bu_inteiro']}))
      return str(verifydata)
    func()
  `;

    return await pyodide.runPythonAsync(pythonCode);}