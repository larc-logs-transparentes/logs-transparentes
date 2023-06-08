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
import Lock from './lock.js'
import {getBuById} from '../../services/services.js'
import ReactJson from 'react-json-view'

class MostrarBU extends Component {
  axios = require('axios')
  bu_api_url = require('../../config.json').bu_api_url
  constructor(props) {
    super(props)
    this.state = {bu: [],
                  votos: [],
                  id:[]
                }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getBuById(id).then(bu => this.setState(
      { 
        bu: bu, 
        votos: bu.votos, 
        id: bu.id 
      }
    ))
  }

  onClickShowProof(e) {
    e.preventDefault()
    var url = "/elements/mostrarbuprova/" + this.state.id
    window.location.href =  url
  }

  groupByPosition(votesArray){
    return votesArray.reduce((acc, curr) => {
      if (!acc[curr.cargo]) {
        acc[curr.cargo] = [];
      }
      acc[curr.cargo].push(curr);
      return acc;
    }, {});
  }
  
  render() {
    var bu = this.state.bu
    var votesArray = (this.state.votos===undefined)? [] : Array.from(this.state.votos)
    const votesOrganizedByPosition = this.groupByPosition(votesArray)

    return (
      <Col>
      <Col md={6}>
        <Card>
          <CardHeader>Consultar Boletins de Urna - Turno
            <button className="btn float-right" onClick={() => this.onClickShowProof.bind(this)}>
              <Link to={`/elements/mostrarbuprova/${this.state.id}` } target='_blank'> 
              <Lock id={this.state.id}/>
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
                <div style={{ display: "flex" }}>
                  {Object.entries(votesOrganizedByPosition).map(([cargo, items]) => (
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
              </CardBody>
          </CardBody>
        </Card>
      </Col>
      </Col>
    );
  }
}

export default MostrarBU;
