import React from 'react'
import { FormGroup, Label, Input, FormText} from 'reactstrap';
import cadVerde from '../../../assets/images/cad-verde.png';
import cadVermelho from '../../../assets/images/cad-vermelho.png';
import { Link } from 'react-router-dom';
const SelecaoCidade = ({state, setState}) => {
    function defineFaixaSaoCarlos(){
        setState( {id_final:102, id_inicial:1});
     }
    function defineFaixaCampinas(){
        setState( {id_final:178, id_inicial:103});
     }
    function defineFaixaRibeiraoPreto(){
        setState( {id_final:199, id_inicial:179});
    }
    function defineFaixaMarilia(){
        setState( {id_final:256, id_inicial:200});
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
                <Link to={`/mapa/provaparcial/${state.id_inicial}/${state.id_final}`}>
                {state.id_inicial && <button className="btn float-right" style={{position: 'relative', bottom: '2px'}}>
                    <img src={(state.resultadoProvaParcial===true)? cadVerde : cadVermelho} alt="estado" /></button>}
                {!state.id_inicial && <span  style={{width: '65.8px'}} />}
                </Link>
            </div>
            {!state.id_inicial && !state.id_final && <FormText color="muted">Selecione a cidade para visualizar os BU's</FormText>}
            {state.id_inicial && state.id_final && <FormText color="muted">Faixa de BU's da cidade: {state.id_inicial} a {state.id_final}</FormText>}
        </FormGroup>
    );
}
 
export default SelecaoCidade;