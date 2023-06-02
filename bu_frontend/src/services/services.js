import { Buffer } from "buffer"
const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url


export function getBuById(bu_id) {
    return axios.get(`${bu_api_url}/bu/${bu_id}`)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
}
export function getDataProof(id){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/data-proof?tree-name=bu_tree&index=${id}`)
        .then((res) => {
            console.log(res.data)
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export function getTrustedRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/tree-root?tree-name=global_tree`)
        .then((res) => {
            console.log(res.data)
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export async function initPyodide(){
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