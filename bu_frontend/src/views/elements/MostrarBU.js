import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,  Button,
  CardText,
  Label,

} from 'reactstrap';

import { Link } from 'react-router-dom';

import { verify } from '../../api/merkletree.api'
import cadVerde from '../../assets/images/cad-verde.png';
import cadVermelho from '../../assets/images/cad-vermelho.png';
import ReactJson from 'react-json-view'

class MostrarBU extends Component {
  axios = require('axios')
  bu_api_url = require('../../config.json').bu_api_url
  // bu_api_url = "http://172.20.11.11:8080"



  constructor(props) {
    super(props)
    this.state = {bu: [],
                  prova: [],
                  votos: [],
                  root: [],
                  fullproof: [],
                  mostrarProva: false,
                  id:[]
                }
    
    this.mostraProva = this.mostraProva.bind(this);

  }

  componentDidMount() {
    const { id } = this.props.match.params;
//    console.log("id=" + id)
    this.axios.get(`${this.bu_api_url}/bu/${id}`)
      .then(response => this.setState({ bu: response.data, votos: response.data.votos,id:response.data.id }))
    var retVerify = verify(id)
    retVerify.then( value => {
      this.setState({ prova: value })
      this.setState({ root: this.state.prova.root })
      this.setState({ fullproof: this.state.prova.fullproof })
    })
    
  }

  mostraProva() {
    this.setState({mostrarProva: !this.state.mostrarProva})
//      (this.state.mostrarProva)
  }
  handleConsultar(e) {
    e.preventDefault()
    var url = "/elements/mostrarbuprova/" + this.state.id
    console.log(url)
    window.location.href =  url
  }
  
  render() {
    var bu=this.state.bu
    var prova = this.state.prova


    console.log(this.state.votos)
  
    var mostrar = this.state.mostrarProva

    var votosArr = (this.state.votos===undefined)? [] : Array.from(this.state.votos)

  const groupByCargo = votosArr.reduce((acc, curr) => {
    if (!acc[curr.cargo]) {
      acc[curr.cargo] = [];
    }
    acc[curr.cargo].push(curr);
    return acc;
  }, {});
    return (
      <Col>
      <Col md={6}>
        <Card>
          <CardHeader>Consultar Boletins de Urna - Turno<button className="btn float-right" onClick={() => this.handleConsultar.bind(this)}>
            <Link to={`/elements/mostrarbuprova/${this.state.id}` } target='_blank'> 
            <img src={(prova.isTrue===true)? cadVerde : cadVermelho} alt="estado"/>
            </Link>
            </button>
            </CardHeader>
          <CardBody>
              <Label>Detalhes</Label>
              <CardBody>
              <Label>Turno</Label>
              <CardText>{bu.turno}º</CardText>
              </CardBody>
              <CardBody>
              <Label>UF</Label>
              <CardText>{bu.UF}</CardText>
              </CardBody>
              <CardBody>
              <Label>Município</Label>
              <CardText>{bu.cidade}</CardText>
              </CardBody>
              <CardBody>
              <Label>Seção</Label>
              <CardText>{bu.secao}</CardText>
              </CardBody>
              <CardBody>
              <Label>Zona</Label>
              <CardText>{bu.zona}</CardText>
              </CardBody>
              <CardBody>
              <Label>Votos</Label>
              <CardText>  
                <div style={{ display: "flex" }}>
                  {Object.entries(groupByCargo).map(([cargo, items]) => (
                    <div style={{ columnCount: 1, marginRight: "30px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                        {cargo}
                      </div>
                      {items.map((item) => (
                        <div>
                          <div>Partido: {item.partido}</div>
                          <div>Código: {item.codigo}</div>
                          <div>Votos: {item.votos}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardText>
              </CardBody>
          </CardBody>
        </Card>
      </Col>
      <Col style={{width:"40vw"}}>
      {mostrar === true && prova.isTrue === true && (<Col md={4}>
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
    {mostrar === true && prova.isTrue === false && (<Col md={4}>
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

export default MostrarBU;
