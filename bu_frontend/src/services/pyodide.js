export default async function initPyodide(){
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.1/full"
  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await pyodide.loadPackage([
    "https://test-files.pythonhosted.org/packages/37/fb/e0cfc7f7cdb8319346dfe8ee93fba1aeaa9e5a2a914b1180a31f5ddb576a/tlverifier-0.0.8-py3-none-any.whl"]
  );
  await micropip.install(["pymerkle-logsTransparentes", "requests"]);

  return pyodide
}

