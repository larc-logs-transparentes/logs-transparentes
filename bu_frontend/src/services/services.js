
import { Buffer } from "buffer"
const axios = require('axios')

const bu_api_url = require('../config.json').bu_api_url

function getBuById(bu_id) {
    return axios.get(`${bu_api_url}/bu/${bu_id}`)
      .then(res => {
      //  console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
}

export default function getDataProof(id){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/data-proof?tree-name=bu_tree&index=${id}`)
        .then((res) => {
            console.log(res.data)
            resolve(Buffer.from(res.data, 'hex'));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
   
}