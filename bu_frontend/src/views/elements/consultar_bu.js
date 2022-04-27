import React, { Component } from 'react';
import {
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input, 
  FormText
} from 'reactstrap';
import { Loader } from '../../vibe/';
import PageLoaderContext from '../../vibe/components/PageLoader/PageLoaderContext';
import laptopImage from '../../assets/images/laptop.jpeg';

class Consultar_BU extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>Consultar Boletins de Urna - Turno</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">Turno</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1º</option>
                  <option>2º</option>
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Consultar Boletins de Urna - Estado</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">UF</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>SP</option>
                  <option>MG</option>
                </Input>
            </FormGroup>
            </CardBody>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">Zona</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>SP</option>
                  <option>MG</option>
                </Input>
            </FormGroup>
            </CardBody>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">Seção</Label>
                <Input name="" id="exampleSelect">

                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Consultar Boletins de Urna - Consulta</CardHeader>
            <CardBody>
              <PageLoaderContext.Consumer>
                {context => (
                  <Button onClick={context.loadPage}>Consultar</Button>
                )}
              </PageLoaderContext.Consumer>
            </CardBody>
          </Card>
        </Col>
        
      </Row>
    );
  }
}

export default Consultar_BU;
