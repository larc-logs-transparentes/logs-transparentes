import React, { Component, useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { Loader } from '../../vibe/';
import PageLoaderContext from '../../vibe/components/PageLoader/PageLoaderContext';
import laptopImage from '../../assets/images/laptop.jpeg';

import api from '../../vibe/services/api';

class Consultar_Todos extends Component {
  constructor() {
    super();
    this.state = {};
  }
  const [bu, setbu] = useState([]);

  useEffect(() => {
    api.get("bu").then(({data}) => {
    
    })
  },[]);

  render() {
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>Todos Boletins de Urna Apurados</CardHeader>
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
        </Col>
        
      </Row>
    );
  }
}

export default Consultar_Todos;
