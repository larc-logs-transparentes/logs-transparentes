import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} 
from 'reactstrap';
import { getRoot, verifyResultProof, getSumOfVotes_infoBUs } from '../../../../api/merkletree_InfoBUs.api'
import { getInfoBUsFromIdRange, getResultProofFromIdRange } from '../../../../api/bu.api';
import SelecaoCidade from './SelecaoCidade';
import ProvaParcial from './ProvaParcial';
import ResultadoEleicao from './ResultadoEleicao';

class Mapa extends Component {
  constructor() {
    super()
    this.state = {
                  infoBUs: [],
                  votos_cidade: [],
                  id_inicial:"",
                  id_final:"",
                  resultadoProvaParcial: false,
                  mostrarProvaParcial: false,
                  dadosProvaParcial: [],
                }

  }

async componentDidUpdate(prevProps, prevState) {
    console.log('---------this.state---------')
    console.log(this.state)
    if(prevState.id_final !== this.state.id_final) {
      const infoBUs = await getInfoBUsFromIdRange(this.state.id_inicial, this.state.id_final)
      this.setState({ infoBUs: infoBUs })
      this.setState({ votos_cidade: getSumOfVotes_infoBUs(infoBUs) })
      
      const root = await getRoot()
      const resultProof = await getResultProofFromIdRange(this.state.id_inicial, this.state.id_final)
      this.setState({ dadosProvaParcial : resultProof })
      this.setState({ resultadoProvaParcial : verifyResultProof(infoBUs, resultProof, root) })
  }
}

  redirecionaParaProvaCompleta(e) {
    e.preventDefault()
    const id_inicial = this.state.id_inicial
    const id_final = this.state.id_final
    var url = `/mapa/verificacaoCompleta/${id_inicial}/${id_final}`
    window.location.href =  url
  }

  render() {
      return (
      <Row>
        <Col md={6}>
          <Card>
            <CardHeader>Selecionar Cidade</CardHeader>
            <CardBody>  
              <SelecaoCidade
               state={this.state}
               setState={this.setState.bind(this)}
              />
            </CardBody>
          </Card>
          <Card style={{padding:"3vw"}} >
            <ResultadoEleicao style={{overflowX:"scroll"}} 
              votos_cidade={this.state.votos_cidade}
              id_inicial={this.state.id_inicial}
              id_final={this.state.id_final}
            />
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <CardHeader>Verificação resumida</CardHeader>
            <CardBody>
              <ProvaParcial 
                mostrarProvaParcial={this.state.mostrarProvaParcial}
                resultadoProvaParcial={this.state.resultadoProvaParcial}
                dadosProvaParcial={this.state.dadosProvaParcial}
              />
            </CardBody>
          </Card>
                  
        </Col>
      </Row>
      
    );
  }
}

export default Mapa;