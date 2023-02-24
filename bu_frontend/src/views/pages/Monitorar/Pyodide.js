import React, { useEffect,useState } from 'react';
import { Card, CardBody, Col, Row, Button,Table } from 'reactstrap'
import script from './main.py';


const runScript = async (code) => {
  const pyodide = await window.loadPyodide({
    indexURL : "https://cdn.jsdelivr.net/pyodide/v0.21.1/full"

  });
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await micropip.install("pymerkle");
  console.log("rodou")
  
  return await pyodide.runPythonAsync(code);
}


export default function Pyodide() {

  const [output, setOutput] = useState("(loading...)");

  useEffect(() => {
    const run = async () => {
      const scriptText = await (await fetch(script)).text();
      const out = await runScript(scriptText);
      setOutput(out);
    }
    run();

  }, []);
  return (
    <p>{output}</p>
  );
}