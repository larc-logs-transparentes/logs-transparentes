const countyCodes = require('./county_codes.json')
const fs = require("fs");

let hashMap = {}

for (const county of countyCodes) {
    hashMap[county.codigo_tse] = {
        "capital": county.capital,
        "codigo_tse": county.codigo_tse,
        "codigo_ibge": county.codigo_ibge,
        "nome_municipio": county.nome_municipio,
        "uf": county.uf,
    }
}

fs.writeFile('county_codes_hash.json', JSON.stringify(hashMap), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
})