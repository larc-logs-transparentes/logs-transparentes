const axios = require('axios')
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

