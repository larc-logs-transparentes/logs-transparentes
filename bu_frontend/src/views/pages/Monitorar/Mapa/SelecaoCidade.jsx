import React from 'react'
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import cadVerde from '../../../../assets/images/cad-verde.png';
import cadVermelho from '../../../../assets/images/cad-vermelho.png';

const SelecaoCidade = ({state, setState}) => {
    function defineFaixaSaoCarlos(){
        setState( {id_final:76, id_inicial:1});
     }
    function defineFaixaCampinas(){
        setState( {id_final:200, id_inicial:77});
     }
    function defineFaixaRibeiraoPreto(){
        setState( {id_final:279, id_inicial:201});
    }
    function defineFaixaMarilia(){
        setState( {id_final:432, id_inicial:280});
    }
    
    function  handleChange(e) {
        if (e.target.value === 'São Carlos'){
          defineFaixaSaoCarlos();}
        else if (e.target.value === 'Campinas'){
          defineFaixaCampinas();}
        else if (e.target.value === 'Ribeirão Preto'){
          defineFaixaRibeiraoPreto();}
        else if (e.target.value === 'Marília'){
          defineFaixaMarilia();}
    }

    function mostraProva() {
        setState({mostrarProvaParcial: !state.mostrarProvaParcial})
    }
    const cidadeArr = ['São Carlos','Campinas', 'Ribeirão Preto', 'Marília']
    
    return ( 
        <FormGroup>
            <div style={{display:'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Label for="turnoSelect">Cidade:</Label>
                <Input type="select" name="turno" id="turnoSelect" onChange={handleChange.bind(this)}>
                    <option value=""></option>
                    {cidadeArr.map((entry, i) => (
                    <option value={entry} key={i}>{entry}</option>            
                    ))}
                </Input>
                {state.id_inicial && <button className="btn float-right" style={{position: 'relative', bottom: '2px'}} onClick={() => mostraProva()}><img src={(state.resultadoProvaParcial===true)? cadVerde : cadVermelho} alt="estado" /></button>}
                {!state.id_inicial && <span  style={{width: '65.8px'}} />}
            </div>
            {!state.id_inicial && !state.id_final && <FormText color="muted">Selecione a cidade para visualizar os BU's</FormText>}
            {state.id_inicial && state.id_final && <FormText color="muted">Faixa de BU's da cidade: {state.id_inicial} a {state.id_final}</FormText>}
        </FormGroup>
    );
}
 
export default SelecaoCidade;