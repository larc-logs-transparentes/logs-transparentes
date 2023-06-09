import {getRoot,getDataProof,getBuById, getTrustedRoot} from './services.js';
import initPyodide from './pyodide.js';
export async function verifySingleData(id){
    const bubyid=await JSON.stringify((getBuById(id)));
    const root=await JSON.stringify(getTrustedRoot());
    const proofData=await JSON.stringify(getDataProof(id));
    console.log(proofData)
    console.log(bubyid)
    const pyodide = await initPyodide();
  
    const pythonCode = `
    from tlverifier.merkle_functions.tl_functions import verify_single_data
    import requests
    import json
    def func():
      proofData=json.loads(${proofData})
      #Definindo true do javascript como True do python
      #proofData['local_tree']['inclusion_proof']['metadata']['security']=True
      #proofData['data']['inclusion_proof']['metadata']['security']=True
      bu=json.loads(${bubyid})
      root=json.loads(${root})
      verifydata =verify_single_data(proofData, root['value'],bu['bu_inteiro'])
      return verifydata
    func()
  `;

    return await pyodide.runPythonAsync(pythonCode);}