import React from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { Loader } from '../../vibe/';
import PageLoaderContext from '../../vibe/components/PageLoader/PageLoaderContext';

export default function Auditar() {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Auditar Boletim de Urna - Em Construção</h4>
          <Row>
            <Col md={3}>
              <Loader type="bars" />
            </Col>
          </Row>
        </CardBody>
      </Card>
      
    </React.Fragment>
  );
}
