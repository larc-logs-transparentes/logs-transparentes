const axios = require('axios')
const bu_api_url = require('../../../config.json').bu_api_url


export async function baixarRoots(){
    axios.get(`${bu_api_url}/tree/all-roots-global-tree`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        return 0
    })
}

