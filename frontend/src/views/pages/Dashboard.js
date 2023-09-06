import React, { Component } from 'react';

import { Card, CardBody, Row, Col, CardTitle, CardText, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import monitoresImage from '../../assets/images/monitores.png';
import { getTrustedRoot } from '../../api/merkletree.api.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      root: null,
      dropdownOpen: false,
      selectedOption: 'Universidade de São Paulo', // Default selected option
    };
  }

  async componentDidMount() {
    const root = await getTrustedRoot();
    this.setState({ root: root.value });
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  selectOption = (option) => {
    this.setState({ selectedOption: option });
  };

  render() {
    const heroStyles = {
      padding: '50px 0 70px',
    };

    const cardStyles = {
      marginLeft: '25%',
    };

    return (
      <div>
        <Row>
          <Col md={6}>
            <div className="home-hero" style={heroStyles}>
              <h1>Site oficial do Logs Transparentes</h1>
              <p className="text-muted">Seja Bem Vindo</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}></Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}>
            <Card>
              <CardBody>
                <CardTitle>Código global da eleição:</CardTitle>
                <CardText>{this.state.root}</CardText>
                <CardTitle>Verificado Por: </CardTitle>
                <CardText>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>{this.state.selectedOption}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => this.selectOption('Exército Brasileiro')}>Exército Brasileiro</DropdownItem>
                      <DropdownItem onClick={() => this.selectOption('Clube de Regatas Vasco da Gama')}>Clube de Regatas Vasco da Gama</DropdownItem>
                      <DropdownItem onClick={() => this.selectOption('Universidade Federal de São Carlos')}>Universidade Federal de São Carlos</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardText>

                <Link to="pages/RootPage/Root.jsx">
                  <Button>Detalhes</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}>
            <Card>
              <CardBody>
                <CardText>
                  <img src={monitoresImage} style={{ width: 1000 }} className="" alt="profile" />
                </CardText>
                <Button>Ver Mais</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
