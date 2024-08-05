import urls from "../data/Urls.json";

export async function initPyodide(){
  const pyodide = await window.loadPyodide({
    indexURL: urls.pyodideIndexURL,
  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await pyodide.loadPackage(urls.pyodidePackages);
  await micropip.install(["pymerkle-logsTransparentes", "requests","setuptools","asn1tools"]);

  return pyodide
}

export async function formatProofDataToPython(proofData){
  if (proofData.local_tree.inclusion_proof.metadata.security) {
    proofData.local_tree.inclusion_proof.metadata.security = 'True';
  } else {
    proofData.local_tree.inclusion_proof.metadata.security = 'False';
  }
  
  if (proofData.data.inclusion_proof.metadata.security) {
    proofData.data.inclusion_proof.metadata.security = 'True';
  } else {
    proofData.data.inclusion_proof.metadata.security = 'False';
  }
  return proofData
}
export async function formatConsistencyProofToPython(allConsistencyProof) {
  for (let index = 0; index < allConsistencyProof.proofs.length; index++) {
    const proof = allConsistencyProof.proofs[index];
    if (proof.consistency_proof.metadata.security === true) {
      proof.consistency_proof.metadata.security = 'True';
    } else {
      proof.consistency_proof.metadata.security = 'False';
    }
  }
  return allConsistencyProof;
}
export async function PythonTruetoJavascriptTrue(pythonTrue){
  if (pythonTrue === 'True') {
    return true;
  } else {
    return false;
  }
}