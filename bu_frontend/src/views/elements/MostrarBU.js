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
//import DeleteIcon from '@mui/icons-material/Delete';
//import IconButton from '@mui/material/IconButton';
//import Tooltip from '@mui/material/Tooltip';
import PageLoaderContext from '../../vibe/components/PageLoader/PageLoaderContext';
import laptopImage from '../../assets/images/laptop.jpeg';

class MostrarBU extends Component {
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
            {/*<Tooltip title="Delete">
            <IconButton>
                <DeleteIcon />
            </IconButton>
    </Tooltip>*/}
                <Label>Detalhes</Label>
                <CardBody>
                    <Label for="exampleSelect">Turno</Label>
                    </CardBody>
                    <CardBody>                    
                    <Label for="exampleSelect">Voto</Label>
                    </CardBody>
                    <CardBody>
                    <Label for="exampleSelect">Seção</Label>
                    </CardBody>
                    <CardBody>
                    <Label for="exampleSelect">Zona</Label>
                </CardBody>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MostrarBU;
