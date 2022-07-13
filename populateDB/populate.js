const shell = require('shelljs');

const DATA = {
    _id: "0",
    id: "0",
    secao: "001", 
    zona: "123", 
    UF: "SP", 
    turno: "1",
    __v: "0",
    votos:[
        {partido: "XX", nome: "Candidado A", votos: 41, _id: "4"},
        {partido: "YY", nome: "Candidado B", votos: 109, _id: "3"}]
} 

for (let index = 0; index <= 2048; index++) {
    shell.env["DATA"] = JSON.stringify(DATA)
    shell.exec('curl -X POST -H "Content-Type: application/json" --data "${DATA}" localhost:8080/bu')  
    DATA._id++;
    DATA.id++;
    DATA.secao++;
    //shell.exec("sleep 0.5")
}