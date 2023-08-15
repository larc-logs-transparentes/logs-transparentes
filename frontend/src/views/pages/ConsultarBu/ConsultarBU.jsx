import React, { Component } from 'react';
import {
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PageLoaderContext from '../../../common/components/PageLoader/PageLoaderContext'

class ConsultarBU extends Component {
  axios = require('axios')
  bu_api_url = require('../../../config.json').bu_api_url

  constructor() {
    super()
    this.state = {
                  turno_opts: [],
                  uf_opts: undefined,
                  zona_opts: undefined,
                  secao_opts: undefined,
                  turno_selection: [],
                  uf_selection: undefined,
                  zona_selection: undefined,
                  secao_selection: undefined,
                  buselection: [],
                }
    this.findBu = this.findBu.bind(this);

  }

  componentDidMount() {
    this.axios.get(`${this.bu_api_url}/bu/distinct_turno`)
      .then(response => {
        this.setState({ turno_opts: response.data });
      })
      .catch(error => {
      });
  }
  
  async findBu(turno_selection, uf_selection, zona_selection, secao_selection) {
    try {
      const response = await this.axios.get(`${this.bu_api_url}/bu/find_by_info?turno=${turno_selection}&UF=${uf_selection}&zona=${zona_selection}&secao=${secao_selection}`);
      this.setState({ buselection: response.data[0].id }, () => {
      });
  
    } catch (error) {
      throw error; // Rethrow the error to be caught in handleConsultar
    }
  }
  
  async handleConsultar(e) {
    e.preventDefault();
  
    const { turno_selection, uf_selection, zona_selection, secao_selection } = this.state;
  
    try {
      await this.findBu(turno_selection, uf_selection, zona_selection, secao_selection);
      
      // Now that the network request is completed, you can access the buselectionId
      const buselectionId = this.state.buselection;
      
      var url = `/pages/MostrarBu/MostrarBu/${buselectionId}`;
      window.location.href = url;
    } catch (error) {
    }
  }
  
  handleChangeTurn(e) {
    var selectedTurno = e.target.value;
    this.setState({ turno_selection: selectedTurno }, () => {
      this.axios.get(`${this.bu_api_url}/bu/distinct_uf?turno=${this.state.turno_selection}`)
        .then(response => {
          this.setState({ uf_opts: response.data });
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
  
  handleChangeUF(e) {
    var selectedUF = e.target.value; 
    this.setState({ uf_selection: selectedUF }, () => {
      this.axios.get(`${this.bu_api_url}/bu/distinct_zona?turno=${this.state.turno_selection}&uf=${this.state.uf_selection}`)	
        .then(response => {
          this.setState({ zona_opts: response.data });
        })
        .catch(error => {
        });
    });
  }
  
  handleChangeZona(e) {
    var selectedZona = e.target.value;
    this.setState({ zona_selection: selectedZona }, () => {
      this.axios.get(`${this.bu_api_url}/bu/distinct_secao?turno=${this.state.turno_selection}&uf=${this.state.uf_selection}&zona=${this.state.zona_selection}`)	
        .then(response => {
          this.setState({ secao_opts: response.data });
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  handleChangeSecao(e) {
    var selectedSecao = e.target.value;
    this.setState({ secao_selection: selectedSecao }, () => {
    });
  }

  render() {

    var turnoArr = this.state.turno_opts || []; 
    var ufArr = this.state.uf_opts || [];       
    var zonaArr = this.state.zona_opts || [];    
    var secaoArr = this.state.secao_opts || []; 

      return (
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>Consultar Boletins de Urna - Turno</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="turnoSelect">Turno</Label>
                <Input type="select" name="turno" id="turnoSelect" onChange={this.handleChangeTurn.bind(this)}>
                <option value=""></option>
                 {turnoArr.map((entry) => (
                    <option value={entry}>{entry}º</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Consultar Boletins de Urna - Estado</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="UFSelect">UF</Label>
                <Input type="select" name="uf" id="uf" onChange={this.handleChangeUF.bind(this)}>
                <option value=""></option>
                {ufArr.map((entry) => (
                    <option value={entry}>{entry}</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
            <CardBody>
              <FormGroup>
                <Label for="zonaSelect">Zona</Label>
                <Input type="select" name="zona" id="zona" onChange={this.handleChangeZona.bind(this)}>
                <option value=""></option>
                {zonaArr.map((entry) => (
                    <option value={entry}>{entry}</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
            <CardBody>
              <FormGroup>
                <Label for="secaoSelect">Seção</Label>
                <Input type="select" name="secao" id="secao" onChange={this.handleChangeSecao.bind(this)}>
                <option value=""></option>
                {secaoArr.map((entry) => (
                    <option value={entry}>{entry}</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Consultar Boletins de Urna - Consulta</CardHeader>
            <CardBody>
              <PageLoaderContext.Consumer>
                {context => (
                  <Link to={"/pages/MostrarBu/MostrarBu/id" }> 
                  <Button onClick={this.handleConsultar.bind(this)}>Consultar</Button>
                  </Link>
                )}
              </PageLoaderContext.Consumer>
            </CardBody>
          </Card>
        </Col> 
      </Row>
    );
  }
}

export default ConsultarBU;