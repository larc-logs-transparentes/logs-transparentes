import React from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { Loader } from '../../../vibe';
import PageLoaderContext from '../../../vibe/components/PageLoader/PageLoaderContext';
import Colunavalidacao from './Colunavalidacao';
import { provaDeConsistencia, subscriber, consistencyProofData } from './logic/subscriber';

export default function Monitorar() {
  React.useEffect(() => {
    // updates subscriber when component is created
    subscriber()
  }, [])

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Monitorar alteração de raiz</h4>
          <Row>
        <Colunavalidacao/>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}