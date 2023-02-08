import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Row, Col} from 'reactstrap';
import { Loader } from '../../../vibe';
import approval from '../../../assets/images/Approved.png';
import error from '../../../assets/images/Error.png';
import { getRoot, getSumOfVotes_infoBUs, bufferToHex, verifyInfoBUs } from '../../../api/merkletree_InfoBUs.api'
import { getInfoBUsFromIdRange } from '../../../api/bu.api';
import './Retotalizar.css';

const VerificacaoCompleta = () => {
    const bu_api_url = require('../../../config.json').bu_api_url

    const { id_inicial, id_final } = useParams();
    const [infoBUs, setInfoBUs] = React.useState();
    const [folhas, setFolhas] = React.useState();
    const [raiz, setRaiz] = React.useState();
    const [retotalizacao, setRetotalizacao] = React.useState(null);

    React.useEffect(async () => {
        const infoBUs = await getInfoBUsFromIdRange(id_inicial, id_final)
        setInfoBUs(infoBUs)
        axios.get(`${bu_api_url}/infoBUs/tree/leaf?id=${id_inicial}&id_final=${id_final}`)
        .then(async response => {
            setFolhas(response.data)
            setRaiz(await getRoot())
        })
        .catch(error => {
            console.log(error)
        })
    }, [id_inicial, id_final])

    if(!retotalizacao && infoBUs)
        setRetotalizacao(getSumOfVotes_infoBUs(infoBUs))
   
     
    const id_incosistente = verifyInfoBUs(infoBUs, folhas, raiz)
    if (infoBUs && folhas) {
        console.log('Raiz: ', raiz)
        console.log('InfoBUS: ', infoBUs)
        console.log('Recontabilização: ', retotalizacao)
        console.log('Folhas da árvore', folhas)
        console.log('ID do infoBU com problemas: ', id_incosistente)
    }
    
   
    /////////// FUNÇÕES DE TEMPO PARA IR MOSTRANDO A TELA ////////////////
    const [stateDownloadInfoBUs, setStateDownload] = React.useState('not started');
    const [stateVerificationInfoBUs, setStateVerification] = React.useState('not started');
    const [stateRetotalizationInfoBUs, setStateRetotalization] = React.useState('not started');
    function StartDownloadInfoBUs(){ 
        setTimeout(() => {setStateDownload('downloading')}, 500);
        return}
    function CompleteDownloadInfoBUs(){
        setTimeout(() => {setStateDownload('completed')}, 2000);
        return}
     function StartVerificationInfoBUs(){
        setTimeout(() => {setStateVerification('verifying')},750);
        return}
    function CompleteVerificationInfoBUs(){
        setTimeout(() => {setStateVerification('completed')}, 2500);
        return}
    function StartRetotalizationInfoBUs(){
        setTimeout(() => {setStateRetotalization('calculating')}, 750);
        return}
    function CompleteRetotalizationInfoBUs(){
        setTimeout(() => {setStateRetotalization('completed')}, 2500);
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
    function str_resultInclusionProof(){
        if (id_incosistente >= 0){
          return ('- A prova de inclusão de um dos infoBUs falhou.')
        }
        else return ('- Todos os infoBUs estao na árvore.')
    } 

    function str_aux_resultInclusionProof(){
        if (id_incosistente >= 0){
          return (`ID do infoBUs com problemas: ${id_incosistente}`)
        }
    }
      
    function color_resultInclusionProof(){
        if (id_incosistente >= 0){
          return ('red')}else return ('black')
    } 
    
    function str_qtdVerification(){
        if (infoBUs.length !== id_final - id_inicial + 1){
          return ('- A quantidade de infoBUs não coincide com o número de sessões')
        }
        else return ('- A quantidade de infoBUs corresponde ao número de sessões.')
    } 

    function color_qtdVerification(){
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
                            <button onClick={()=> {StartDownloadInfoBUs()}} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                                Iniciar Verificação
                            </button>
                            </div>
                        </CardBody>

                        <div style={{margin:'auto', width:'23%'}}>
                            {stateDownloadInfoBUs !== 'not started' &&

                            <div style={{display:'block',textAlign:'justify'}}>
                                <h5>Raiz: {bufferToHex(raiz.leaf)}</h5>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <h5>1) Baixando infoBUs</h5>
                                    <Row md={4} style={{padding:'2vw'}}>
                                        {stateDownloadInfoBUs === 'downloading' && <Loader small type="spin"/>}
                                        {stateDownloadInfoBUs === 'completed' && <img src={selo1()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                                    </Row>
                                </div>

                                {CompleteDownloadInfoBUs()}
                                {stateDownloadInfoBUs === 'completed' &&  
                                <div style={{display:'flex', alignItems:'center',gap:'1vw'}}>
                                    <h5>- {infoBUs.length} infoBUs Baixados</h5>
                                    {stateVerificationInfoBUs === 'not started' && StartVerificationInfoBUs()}    
                                </div>}
                            </div>}

                            {stateVerificationInfoBUs !== 'not started' && 
                            <div style={{display:selo1(),textAlign:'justify'}}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <h5>2) Verificando infoBUs</h5>
                                    <Row md={4} style={{padding:'2vw'}}>
                                        {stateVerificationInfoBUs === 'verifying' && <Loader small type="spin"/>}
                                        {stateVerificationInfoBUs === 'completed' && <img src={selo2()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                                    </Row>
                                </div>
                                {CompleteVerificationInfoBUs()}
                                {stateVerificationInfoBUs === 'completed' && 
                                <div>
                                    <h5 style={{color:color_resultInclusionProof()}}>{str_resultInclusionProof()}</h5>
                                    <h5 style={{color:color_resultInclusionProof()}}>{str_aux_resultInclusionProof()}</h5>
                                    <h5 style={{color:color_qtdVerification()}}>{str_qtdVerification()}</h5>
                                    {stateRetotalizationInfoBUs === 'not started' && StartRetotalizationInfoBUs()}
                                </div>}
                            </div>}

                            {stateRetotalizationInfoBUs !== 'not started' &&
                            <div style={{display:selo1(),textAlign:'justify'}}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <h5>3) Retotalizando infoBUs</h5>
                                    <Row md={4} style={{padding:'2vw'}}>
                                        {stateRetotalizationInfoBUs === 'calculating' && <Loader small type="spin"/>}
                                        {stateRetotalizationInfoBUs === 'completed' && <img src={approval} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                                    </Row>
                                </div>
                                {CompleteRetotalizationInfoBUs()}
                                {stateRetotalizationInfoBUs === 'completed' && 
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