import React, { useEffect,useState } from 'react';
import { Card, CardBody, Col, Row, Button,Table } from 'reactstrap'
import script from './main.py';
import {getRoot,getDataProof,getBuById, getTrustedRoot} from './services.js';
import cadVerde from '../assets/images/cad-verde.png';
import cadVermelho from '../assets/images/cad-vermelho.png';

const runScript = async (id) => {
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.1/full"
  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  
  await pyodide.loadPackage([
    "https://test-files.pythonhosted.org/packages/37/fb/e0cfc7f7cdb8319346dfe8ee93fba1aeaa9e5a2a914b1180a31f5ddb576a/tlverifier-0.0.8-py3-none-any.whl"]
  );
  await micropip.install(["pymerkle-logsTransparentes", "requests"]);

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
  console.log(pythonCode)
  return await pyodide.runPythonAsync(pythonCode);
}



export default function Pyodide(props) {

  const [output, setOutput] = useState("(loading...)");

  useEffect(() => {
    const run = async () => {
      //const scriptText = await (await fetch(script)).text();
      const out = await runScript(props.id);
      console.log(out);
      setOutput(out);
    };
    run();
  }, [props.id]);

  return (
    <div>
      <p>
        <img
          src={output === 'True' ? cadVerde : cadVermelho}
          alt="estado"
        />
      </p>
    </div>
  );
}