import React from 'react'
import { useParams } from 'react-router-dom';
import { Card, CardBody, Row, Col} from 'reactstrap';
import { getRoot, getSumOfVotes_infoBUs, verifyInfoBUs } from '../../../api/merkletree_InfoBUs.api'
import { getInfoBUsFromIdRange, getLeavesAndProofFromIdRange } from '../../../api/bu.api';
import '../Recontabilizar/Retotalizar.css';
import AnimacaoVerificacao from './AnimacaoVerificacao';

const VerificacaoCompleta = () => {
    const { id_inicial, id_final } = useParams();
    const [infoBUs, setInfoBUs] = React.useState();
    const [folhas, setFolhas] = React.useState();
    const [raiz, setRaiz] = React.useState();
    const [retotalizacao, setRetotalizacao] = React.useState(null);

    React.useEffect(() => {
        async function fetchData(){
            const infoBUs = await getInfoBUsFromIdRange(id_inicial, id_final)
            setInfoBUs(infoBUs)
            setRetotalizacao(getSumOfVotes_infoBUs(infoBUs))
            
            const leaves = await getLeavesAndProofFromIdRange(id_inicial, id_final)
            setFolhas(leaves)
            setRaiz(await getRoot())
        }
        fetchData()

    }, [id_inicial, id_final])
     
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
        setTimeout(() => {
            setStateDownload('downloading')
            CompleteDownloadInfoBUs()
        }, 500);
        return}

    function CompleteDownloadInfoBUs(){
        setTimeout(() => {
            setStateDownload('completed')
            StartVerificationInfoBUs()
        }, 2000);
        return}

     function StartVerificationInfoBUs(){
        setTimeout(() => {
            setStateVerification('verifying')
            CompleteVerificationInfoBUs()
        },750);
        return}

    function CompleteVerificationInfoBUs(){
        setTimeout(() => {
            setStateVerification('completed')
            StartRetotalizationInfoBUs()
        }, 2500);
        return}

    function StartRetotalizationInfoBUs(){
        setTimeout(() => {
            setStateRetotalization('calculating')
            CompleteRetotalizationInfoBUs()
        }, 750);
        return}

    function CompleteRetotalizationInfoBUs(){
        setTimeout(() => {setStateRetotalization('completed')}, 2500);
        return}  
    /////////////////////////////////////////////////////////////////////
    
    return (
        <div>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody >
                            <h4> Verificação completa da cidade </h4>
                            <div style={{textAlign:'center'}} >
                            <button onClick={()=> {StartDownloadInfoBUs()}} disabled={stateDownloadInfoBUs !== 'not started'} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                                Iniciar Verificação
                            </button>
                            </div>
                        </CardBody>
                            <AnimacaoVerificacao
                                stateDownloadInfoBUs={stateDownloadInfoBUs}
                                stateVerificationInfoBUs={stateVerificationInfoBUs}
                                stateRetotalizationInfoBUs={stateRetotalizationInfoBUs}
                                infoBUs={infoBUs}
                                id_incosistente={id_incosistente}
                                retotalizacao={retotalizacao}
                            />
                        
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
 
export default VerificacaoCompleta;