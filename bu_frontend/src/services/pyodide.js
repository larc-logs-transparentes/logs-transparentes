export default async function initPyodide(){
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.1/full"
  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await pyodide.loadPackage([
    "https://test-files.pythonhosted.org/packages/c1/77/9c1b3152c0021a6e16314aca96ab1de5a96568572d90b52aaf545fe88e53/tlverifier-0.0.10-py3-none-any.whl"]
  );
  await micropip.install(["pymerkle-logsTransparentes", "requests"]);

  return pyodide
}

