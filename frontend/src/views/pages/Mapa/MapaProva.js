import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} 
from 'reactstrap';
import { getRoot, verifyResultProof, getSumOfVotes_infoBUs } from '../../../api/merkletree_InfoBUs.api'
import { getInfoBUsFromIdRange, getResultProofFromIdRange } from '../../../api/bu.api';
import SelecaoCidade from './SelecaoCidade';
import ProvaParcial from './ProvaParcial';
import ResultadoEleicao from './ResultadoEleicao';

class MapaProva extends Component {
    constructor(props) {
      super(props);
      const { params } = props.match;
      this.state = {
        infoBUs: [],
        votos_cidade: [],
        id_inicial: params.id_inicial,
        id_final: params.id_final,
        resultadoProvaParcial: false,
        mostrarProvaParcial: true,
        dadosProvaParcial: [],
      };
    }

async componentDidMount() {
    console.log('---------this.state---------')
    console.log(this.state)

    const infoBUs = await getInfoBUsFromIdRange(this.state.id_final, this.state.id_inicial)
    this.setState({ infoBUs: infoBUs })
    this.setState({ votos_cidade: getSumOfVotes_infoBUs(infoBUs) })
    
    const root = await getRoot()
    const resultProof = await getResultProofFromIdRange(this.state.id_inicial, this.state.id_final)
    this.setState({ dadosProvaParcial : resultProof })
    this.setState({ resultadoProvaParcial : verifyResultProof(infoBUs, resultProof, root) })
}

  render() {
      return (
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>Verificação resumida</CardHeader>
            <CardBody style={{overflowX:"scroll"}}>
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

export default MapaProva;