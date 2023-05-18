import React, { useEffect,useState } from 'react';
import { Card, CardBody, Col, Row, Button,Table } from 'reactstrap'
import script from './main.py';
import verify from './services.js';

const runScript = async (code) => {
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.1/full"
  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await pyodide.loadPackage(
    "https://test-files.pythonhosted.org/packages/37/fb/e0cfc7f7cdb8319346dfe8ee93fba1aeaa9e5a2a914b1180a31f5ddb576a/tlverifier-0.0.8-py3-none-any.whl"
  );
  await micropip.install("pymerkle-logsTransparentes");
  const verificacao=await verify(1);
  console.log(verificacao.fullproofString)
  const pythonCode = `
  from tlverifier.merkle_functions.tl_functions import verify_inclusion_proof

  def func():
    verificacaodeinclusao = verify_inclusion_proof(${verificacao.fullproofString}, '${verificacao.root}','${verificacao.leaf}')
    return verificacaodeinclusao

  print(func())
`;

  return await pyodide.runPythonAsync(pythonCode);
}



export default function Pyodide() {

  const [output, setOutput] = useState("(loading...)");

  useEffect(() => {
    const run = async () => {
      const scriptText = await (await fetch(script)).text();
      const test=1;
      const out = await runScript(scriptText,test);
      console.log(out)
      setOutput(out);
    }
    run();

  }, []);
  return (
    <p>{output}</p>
  );
}