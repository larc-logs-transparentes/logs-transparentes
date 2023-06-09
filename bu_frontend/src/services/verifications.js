import {getRoot,getDataProof,getBuById, getTrustedRoot} from './services.js';
import initPyodide from './pyodide.js';
export async function verifySingleData(id){
    let bubyid=await getBuById(id);
    let root=await getTrustedRoot();
    let proofData=await getDataProof(id);
    proofData['local_tree']['inclusion_proof']['metadata']['security']='True'
    proofData['data']['inclusion_proof']['metadata']['security']='True'
    const pyodide = await initPyodide();
    root=JSON.stringify(root)
    bubyid=JSON.stringify(bubyid)
    proofData=JSON.stringify(proofData)
    const pythonCode = `
    from tlverifier.merkle_functions.tl_functions import verify_single_data
    import requests
    import json
    def func():
      proofData=json.loads(${proofData})
      #Definindo true do javascript como True do python
      proofData['local_tree']['inclusion_proof']['metadata']['security']=True
      proofData['data']['inclusion_proof']['metadata']['security']=True
      bu=json.loads(${bubyid})
      root=json.loads(${root})
      verifydata =verify_single_data(proofData, root['value'],bu['bu_inteiro'])
      return verifydata
    func()
  `;

    return await pyodide.runPythonAsync(pythonCode);}