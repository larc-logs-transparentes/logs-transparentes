import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Row, Col} from 'reactstrap';
import { Loader } from '../../../vibe';
import approval from '../../../assets/images/Approved.png';
import error from '../../../assets/images/Error.png';
import { getRoot, verifyInclusionProof, getSumOfVotes_infoBUs, bufferToHex } from '../../../api/merkletree_InfoBUs.api'
import './Retotalizar.css';

const VerificacaoCompleta = () => {
    const bu_api_url = require('../../../config.json').bu_api_url

    const { id_inicial, id_final } = useParams();
    const [infoBUs, setInfoBUs] = React.useState();
    const [folhas, setFolhas] = React.useState();
    const [raiz, setRaiz] = React.useState();
    const [retotalizacao, setRetotalizacao] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${bu_api_url}/infoBUs?id=${id_inicial}&id_final=${id_final}`)
        .then(async response => {
            const infoBUs = response.data
            infoBUs.sort((a, b) => a.id - b.id)
            setInfoBUs(infoBUs)
            axios.get(`${bu_api_url}/infoBUs/tree/leaf?id=${id_inicial}&id_final=${id_final}`)
            .then(async response => {
                setFolhas(response.data)
                setRaiz(await getRoot())
            })
        })
        .catch(error => {
            console.log(error)
        })
    }, [id_inicial, id_final])

    if(!retotalizacao && infoBUs)
        setRetotalizacao(getSumOfVotes_infoBUs(infoBUs))

    const searchIncosistent_InfoBU = (infoBUs) => {
        const infoBUsVerificados = () => {
            let leaves = infoBUs.map((infoBU, i) => {
                return {...infoBU, resultadoProvaDeInclusao: verifyInclusionProof(folhas[i].leaf, raiz, folhas[i].proof)}
            })
            return leaves
        }

        for (let i = 0; i < infoBUsVerificados.length; i++) {
            if (infoBUsVerificados[i].resultadoProvaDeInclusao === false){
                return infoBUsVerificados[i].id
            }
        }
        return -1
    }
   
     
    const id_incosistente = searchIncosistent_InfoBU(infoBUs)
    if (infoBUs && folhas) {
        console.log('Raiz: ', raiz)
        console.log('InfoBUS: ', infoBUs)
        console.log('Recontabilização: ', retotalizacao)
        console.log('Folhas da árvore', folhas)
    }
    
   
    /////////// FUNÇÕES DE TEMPO PARA IR MOSTRANDO A TELA ////////////////
    const [baixarBUs, setBbus] = React.useState(false);
    const [baixarBUsCompleto, setBbusCompleto] = React.useState(false);
    const [verificarBUs, setVbus] = React.useState(false);
    const [verificarBUs2, setVbus2] = React.useState(false);
    const [showret, setRet] = React.useState(false);
    const [showret2, setRet2] = React.useState(false);
    function BaixarBus(){
        setTimeout(() => {setBbus(true)}, 500);
        return}
    function BaixarBus2(){
        setTimeout(() => {setBbusCompleto(true)}, 2000);
        return}
     function VerificarBus(){
        setTimeout(() => {setVbus(true)},750);
        return}
    function VerificarBus2(){
        setTimeout(() => {setVbus2(true)}, 2500);
        return}
    function RetotalizarBus(){
        setTimeout(() => {setRet(true)}, 750);
        return}
    function RetotalizarBus2(){
        setTimeout(() => {setRet2(true)}, 2500);
        return}  

    function selo1(){
        if (infoBUs)
            return approval
        else
            return error   
    }
    function selo2(){
        if (infoBUs.length !== id_final - id_inicial + 1 || id_incosistente >= 0){
          return (error)
        }
        else return (approval)
    } 

    /////////////////////////////////////////////////////////////////////
    ////////////////////// FUNÇÔES DE VERIFICAÇÃO ///////////////////////
    function verificacaodebus(){
        if (id_incosistente >= 0){
          return ('- A prova de inclusão de um dos infoBUs falhou.')
        }
        else return ('- Todos os infoBUs estao na árvore.')
    } 

    function auxiliarverificacao(){
        if (id_incosistente >= 0){
          return (`ID do infoBUs com problemas: ${id_incosistente}`)
        }
    }
      
    function verificacaoinclusaocor(){
        if (id_incosistente >= 0){
          return ('red')}else return ('black')
    } 
    
    function verificacaoquantidade(){
        if (infoBUs.length !== id_final - id_inicial + 1){
          return ('- A quantidade de infoBUs não coincide com o número de sessões')
        }
        else return ('- A quantidade de infoBUs corresponde ao número de sessões.')
    } 

    function verificacaoquantidadecor(){
        if (infoBUs.length !== id_final - id_inicial + 1){
          return ('red')
        }
        else return ('black')
    } 
    /////////////////////////////////////////////////////////////////////

    return (
        <div>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody >
                            <h4> Verificação completa da cidade </h4>
                            <div style={{textAlign:'center'}} >
                            <button onClick={()=> {BaixarBus(true)}} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                                Iniciar Verificação
                            </button>
                            </div>
                        </CardBody>

                        <div style={{margin:'auto', width:'23%'}}>
                            {baixarBUs &&

                            <div style={{display:'block',textAlign:'justify'}}>
                                <h5>Raiz: {bufferToHex(raiz.leaf)}</h5>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <h5>1) Baixando infoBUs</h5>
                                    <Row md={4} style={{padding:'2vw'}}>
                                        {!baixarBUsCompleto && <Loader small type="spin"/>}
                                        {baixarBUsCompleto && <img src={selo1()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                                    </Row>
                                </div>
                                {BaixarBus2()}
                                {baixarBUsCompleto &&  
                                <div style={{display:'flex', alignItems:'center',gap:'1vw'}}>
                                    <h5>- {infoBUs.length} infoBUs Baixados</h5>
                                    {VerificarBus()}
                                </div>}
                            </div>}

                            {verificarBUs && 
                            <div style={{display:selo1(),textAlign:'justify'}}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <h5>2) Verificando infoBUs</h5>
                                    <Row md={4} style={{padding:'2vw'}}>
                                        {!verificarBUs2 && <Loader small type="spin"/>}
                                        {verificarBUs2 && <img src={selo2()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                                    </Row>
                                </div>
                            {VerificarBus2()}
                            {verificarBUs2 && 
                            <div>
                                <h5 style={{color:verificacaoinclusaocor()}}>{verificacaodebus()}</h5>
                                <h5 style={{color:verificacaoinclusaocor()}}>{auxiliarverificacao()}</h5>
                                <h5 style={{color:verificacaoquantidadecor()}}>{verificacaoquantidade()}</h5>
                                {RetotalizarBus()}
                            </div>}
                            </div>}

                            {showret &&
                            <div style={{display:selo1(),textAlign:'justify'}}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <h5>3) Retotalizando infoBUs</h5>
                                    <Row md={4} style={{padding:'2vw'}}>
                                        {!showret2 && <Loader small type="spin"/>}
                                        {showret2 && <img src={approval} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                                    </Row>
                                </div>
                                {RetotalizarBus2()}
                                {showret2 && 
                                <div>
                                    <h5>- Resultado final:</h5>
                                    <h5>{retotalizacao.map(({nome, votos}) => (
                                        <p key={nome}>{nome}: {votos} votos</p>))}
                                    </h5>
                                </div>}
                            </div>}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
 
export default VerificacaoCompleta;