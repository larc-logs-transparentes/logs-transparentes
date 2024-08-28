const fs = require('fs');
const path = require('path');

function obterDescricaoTp(tp) {
    const tipos = {
        "1": "Estadual Ordinária",
        "2": "Estadual Suplementar",
        "3": "Municipal Ordinária",
        "4": "Municipal Suplementar",
        "5": "Consulta Popular Nacional",
        "6": "Consulta Popular Estadual",
        "7": "Consulta Popular Municipal",
        "8": "Federal Ordinária",
        "9": "Federal Suplementar"
    };
    return tipos[tp] || "Desconhecido";
}

function extrairLocal(nm) {
    const partes = nm.split(' - ');
    return partes.length > 1 ? partes[1] : '';
}

function gerarJsonEleicao(dados) {
    const resultado = {};

    dados.pl.forEach(plItem => {
        if (plItem.dt && typeof plItem.dt === 'string') {
            const ano = plItem.dt.split('/').reverse()[0];  

            plItem.e.forEach(eleicao => {
                const cd = eleicao.cd;
                const turno = eleicao.t === "1" ? "1° Turno" : "2° Turno";
                const tipoEleicao = obterDescricaoTp(eleicao.tp);

                if (eleicao.tp === "4" || eleicao.tp === "9") { 
                    const local = extrairLocal(eleicao.nm);
                    resultado[cd] = `${turno} ${ano} (${tipoEleicao} - ${local})`;
                } else {
                    resultado[cd] = `${turno} ${ano} (${tipoEleicao})`;
                }
            });
        } else {
            console.warn(`Campo 'dt' não definido ou inválido para o item pl com código ${plItem.cd}`);
        }
    });

    return resultado;
}

const entradaPath = path.join(__dirname, '..', '..', 'public', 'ele-c.json');

fs.readFile(entradaPath, 'utf-8', (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo de entrada:", err);
        return;
    }

    const dados = JSON.parse(data);
    const resultado = gerarJsonEleicao(dados);

    const saidaPath = path.join(__dirname, '..', 'data', 'ElectionFormatted.json');

    fs.mkdir(path.dirname(saidaPath), { recursive: true }, (err) => {
        if (err) {
            console.error("Erro ao criar a pasta de saída:", err);
            return;
        }

        fs.writeFile(saidaPath, JSON.stringify(resultado, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error("Erro ao salvar o arquivo de resultado:", err);
                return;
            }

            console.log("Resultado salvo com sucesso em", saidaPath);
        });
    });
});
