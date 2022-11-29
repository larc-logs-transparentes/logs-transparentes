const axios = require('axios')
const merkletree_adapter = require("../../../api/merkletree.adapter")
const merkletree_api = require("../../../api/merkletree.api")
const bu_api = require("../../../api/bu.api")

const backendHostname = "http://localhost"
const backendPort = 8080
const bu_api_url = require('../../../config.json').bu_api_url


export async function baixarRoots(){
    return await axios.get(`${bu_api_url}/root/get_all`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        return 0
    })
}

