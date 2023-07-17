export async function initPyodide(){
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.1/full"
  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await pyodide.loadPackage([
    "https://test-files.pythonhosted.org/packages/40/c5/59ea5c707b79a81ef357dd311c79c74eb5059c1b0d143c9ea65dc5d4699c/tlverifier-0.0.25-py3-none-any.whl"]
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