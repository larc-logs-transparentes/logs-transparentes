import React from "react";
import { Row } from "reactstrap";
import { Loader } from '../../../common';
import { bufferToHex, getRoot } from "../../../api/merkletree_InfoBUs.api";
import approval from '../../../assets/images/Approved.png';
import error from '../../../assets/images/Error.png';

const AnimacaoVerificacao = ({stateDownloadInfoBUs, stateVerificationInfoBUs, stateRetotalizationInfoBUs, infoBUs, id_incosistente, retotalizacao}) => {
    const id_inicial = infoBUs ? infoBUs[0].id : 0
    const id_final = infoBUs ? infoBUs[infoBUs.length-1].id : 0
    const [raiz, setRaiz] = React.useState();
    
    React.useEffect(() => {
        async function fetchData() {
            setRaiz(await getRoot())
        }
        fetchData()
    }, [])
    
    ////////////////////// FUNÇÔES DE VERIFICAÇÃO ///////////////////////
    function str_resultInclusionProof(){
        if (id_incosistente >= 0){
          return ('- A prova de inclusão de um dos infoBUs falhou.')
        }
        else return ('- Todos os infoBUs estão na árvore e não foram modificados.')
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

    function selo_infoBUs(){
        if (infoBUs)
            return approval
        else
            return error   
    }
    
    function selo_qtdInfoBUs(){
        if (infoBUs.length !== id_final - id_inicial + 1 || id_incosistente >= 0){
          return (error)
        }
        else return (approval)
    } 
    function definirColunas(resultadoAgrupado){
        const numeroDeCargos=resultadoAgrupado.length
            return `repeat(${numeroDeCargos}, minmax(150px, 1fr))`
    }	
    /////////////////////////////////////////////////////////////////////
    const resultadoAgrupado = retotalizacao ? retotalizacao.reduce((acc, { cargo, codigo, votos, partido }) => {
        const index = acc.findIndex(item => item.cargo === cargo);
        if (index === -1) {
            acc.push({ cargo, votosData: [{ codigo, votos }] });
        } else {
            acc[index].votosData.push({ codigo, votos });
            acc[index].votosData.sort((a, b) => b.votos - a.votos);
        }
        return acc;
    }, []) : [];

    
    return (
        <div style={{margin:'auto', width:'50%'}}>
            {stateDownloadInfoBUs !== 'not started' &&
            <div style={{display:'block',textAlign:'justify'}}>
                <h5>Raiz: {bufferToHex(raiz.leaf)}</h5>
                <div style={{display:'flex',alignItems:'center'}}>
                    <h5>1) Baixando infoBUs</h5>
                    <Row md={4} style={{padding:'2vw'}}>
                        {stateDownloadInfoBUs === 'downloading' && <Loader small type="spin"/>}
                        {stateDownloadInfoBUs === 'completed' && <img src={selo_infoBUs()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                    </Row>
                </div>
                {stateDownloadInfoBUs === 'completed' &&  
                <div style={{display:'flex', alignItems:'center',gap:'1vw'}}>
                    <h5>- {infoBUs.length} infoBUs Baixados</h5>
                    {stateVerificationInfoBUs === 'not started'}    
                </div>}
            </div>}

            {stateVerificationInfoBUs !== 'not started' && 
            <div style={{display:selo_infoBUs(),textAlign:'justify'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                    <h5>2) Verificando infoBUs</h5>
                    <Row md={4} style={{padding:'2vw'}}>
                        {stateVerificationInfoBUs === 'verifying' && <Loader small type="spin"/>}
                        {stateVerificationInfoBUs === 'completed' && <img src={selo_qtdInfoBUs()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                    </Row>
                </div>
                {stateVerificationInfoBUs === 'completed' && 
                <div>
                    <h5 style={{color:color_resultInclusionProof()}}>{str_resultInclusionProof()}</h5>
                    <h5 style={{color:color_resultInclusionProof()}}>{str_aux_resultInclusionProof()}</h5>
                    <h5 style={{color:color_qtdVerification()}}>{str_qtdVerification()}</h5>
                    {stateRetotalizationInfoBUs === 'not started'}
                </div>}
            </div>}

            {stateRetotalizationInfoBUs !== 'not started' &&
            <div style={{display:selo_infoBUs(),textAlign:'justify'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                    <h5>3) Retotalizando infoBUs</h5>
                    <Row md={4} style={{padding:'2vw'}}>
                        {stateRetotalizationInfoBUs === 'calculating' && <Loader small type="spin"/>}
                        {stateRetotalizationInfoBUs === 'completed' && <img src={approval} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />}
                    </Row>
                </div>
                {stateRetotalizationInfoBUs === 'completed' && 
                <div>
                    <h5>- Resultado final:</h5>
                    <div style={{ display: "grid", gridTemplateColumns:definirColunas(resultadoAgrupado), gap: "1em",columnCount:'5' }}>
                        {resultadoAgrupado.map(({ cargo, votosData }, index) => (
                        <div key={index}>
                            <h4 style={{ fontWeight: 'bold' }}>{cargo}</h4>
                            {votosData.map(({ codigo, votos }, i) => (
                            <p key={i}>{codigo}: {votos} votos</p>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default AnimacaoVerificacao;