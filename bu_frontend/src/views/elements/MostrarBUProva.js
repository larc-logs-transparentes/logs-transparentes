import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Label,

} from 'reactstrap';
import { getDataProof } from '../../api/merkletree.api.js'
import ReactJson from 'react-json-view'

class MostrarBUProva extends Component {
  axios = require('axios')
  bu_api_url = require('../../config.json').bu_api_url
  constructor(props) {
    super(props)
    this.state = {
                  prova: [],
                  mostrarProva: false,
                }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const prova = await getDataProof(id);
    this.setState({ prova });
  }

  render() {
    var prova = this.state.prova
    return (
      <Col>
      <Col style={{width:"60vw"}}>
      {prova['status'] == 'ok' && (<Col> 
      <Card style={{width:"60vw"}}>
        <CardHeader >Este BU foi devidamente verificado nos sistemas da Justiça Federal</CardHeader>
        <CardBody style={{overflowX:"scroll"}}>
            <CardBody>
            <Label>Prova</Label>
            <ReactJson collapsed displayDataTypes={false} src={this.state.prova} />
            </CardBody>
        </CardBody>
      </Card>
    </Col>)}
    {prova['status'] != 'ok' && (<Col>
      <Card>
        <CardHeader>ATENÇÃO: Este BU não pode ser verificado ou foi ALTERADO</CardHeader>
        <CardBody style={{overflowX:"scroll"}}>
            <CardBody>
            <Label>Prova</Label>
            <ReactJson collapsed displayDataTypes={false} src={this.state.prova} />
            </CardBody>
        </CardBody>
      </Card>
    </Col>)}
    </Col>
      </Col>
    );
  }
}

export default MostrarBUProva;
