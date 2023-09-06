export async function initPyodide(){
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.1/full"
  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await pyodide.loadPackage([
    "https://test-files.pythonhosted.org/packages/97/47/d6927d6fbf3f54c30f2aaca7ca8e9fb475ee8d069e9f367d8fe4ceb0b981/tlverifier-0.0.28-py3-none-any.whl"]
  );
  await micropip.install(["pymerkle-logsTransparentes", "requests","setuptools"]);

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