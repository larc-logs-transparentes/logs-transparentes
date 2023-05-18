import React from "react";
import { FormGroup, Label, Col, Card, CardHeader, CardBody, CardText } from "reactstrap";
import ReactJson from 'react-json-view'
const ProvaParcial = ({ mostrarProvaParcial, dadosProvaParcial, resultadoProvaParcial }) => {
    return (
        <FormGroup>
            {mostrarProvaParcial === true && resultadoProvaParcial && (<Col md={14}>
            <Card>
                <CardHeader>O resultado dessa cidade foi verificada nos sistemas da Justiça eleitoral</CardHeader>
                <CardBody>
                    <CardBody>
                        <Label>Prova</Label>
                        <CardText>Foram verificados {dadosProvaParcial.length} nós da árvore de infoBUs</CardText>                    
                        <ReactJson collapsed displayDataTypes={false} src={dadosProvaParcial} />
                    </CardBody>
                </CardBody>
            </Card>
            </Col>)}
            {mostrarProvaParcial === true && !resultadoProvaParcial && (
            <Col md={14}>
                <Card>
                    <CardHeader>ATENÇÃO: O resultado dessa cidade não pode ser verificado ou foi ALTERADO</CardHeader>
                    <CardBody>
                        <CardBody>
                            <Label>Prova</Label>
                            <ReactJson collapsed displayDataTypes={false} src={dadosProvaParcial} />
                        </CardBody>
                    </CardBody>
                </Card>
            </Col>)} 
        </FormGroup>
    )
}

export default ProvaParcial;