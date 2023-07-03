import React from "react";
import { CardHeader } from "reactstrap";

const ResultadoEleicao = ({ votos_cidade, id_inicial, id_final }) => {
    
    function redirecionaParaProvaCompleta(e) {
        e.preventDefault()
        var url = `/mapa/verificacaoCompleta/${id_inicial}/${id_final}`
        window.location.href =  url
      }
      function definirColunas(resultadoAgrupado){
        const numeroDeCargos=resultadoAgrupado.length
            return `repeat(${numeroDeCargos}, minmax(150px, 1fr))`
    }	
    /////////////////////////////////////////////////////////////////////
    const resultadoAgrupado = votos_cidade ? votos_cidade.reduce((acc, { cargo, codigo, votos, partido }) => {
        const index = acc.findIndex(item => item.cargo === cargo);
        if (index === -1) {
            acc.push({ cargo, votosData: [{ codigo, votos }] });
        } else {
            acc[index].votosData.push({ codigo, votos });
            acc[index].votosData.sort((a, b) => b.votos - a.votos);
        }
        return acc;
    }, []) : [];
    return (
        <>
            <CardHeader>Resultado da eleição:</CardHeader>
            <div style={{ display: "grid", gridTemplateColumns:definirColunas(resultadoAgrupado), gap: "1em",columnCount:'5' }}>
              {resultadoAgrupado.map(({ cargo, votosData }, index) => (
                <div key={index}>
                    <h4 style={{ fontWeight: 'bold' }}>{cargo}</h4>
                    {votosData.map(({ codigo, votos }, i) => (
                    <p key={i}>{codigo}: {votos} votos</p>
                    ))}
                </div>
              ))}
            </div>
            {id_inicial && <div style={{display: 'flex', justifyContent:'center'}}>
              <button onClick={redirecionaParaProvaCompleta.bind(this)} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem', width: '45%', marginBottom: '20px'}}>
                Verificação completa
              </button>

            </div>}
        </>
    )
}

export default ResultadoEleicao;