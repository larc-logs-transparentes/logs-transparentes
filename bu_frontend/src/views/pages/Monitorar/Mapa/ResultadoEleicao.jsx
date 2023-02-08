import React from "react";
import { FormGroup, Label, Col, Card, CardHeader, CardBody, CardText } from "reactstrap";

const ResultadoEleicao = ({ votos_cidade, id_inicial, id_final }) => {
    
    function redirecionaParaProvaCompleta(e) {
        e.preventDefault()
        var url = `/mapa/verificacaoCompleta/${id_inicial}/${id_final}`
        window.location.href =  url
      }

    return (
        <>
            <CardHeader>Resultado da eleição:</CardHeader>
                <h5 style={{marginLeft:'20px'}}>{votos_cidade.map(({nome, votos}) =>
                    (<p key={nome}>{nome}: {votos} votos</p>))}</h5>
            
            {id_inicial && <div style={{display: 'flex', justifyContent:'center'}}>
              <button onClick={redirecionaParaProvaCompleta.bind(this)} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem', width: '45%', marginBottom: '20px'}}>
                Verificação completa
              </button>

            </div>}
        </>
    )
}

export default ResultadoEleicao;