import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getRoot, verifyMultipleProofs, verifyProof, votosTotal } from '../../../api/merkletree_InfoBUs.api'

const VerificacaoCompleta = () => {
    const bu_api_url = require('../../../config.json').bu_api_url

    const { id_inicial, id_final } = useParams();
    const [infoBUs, setInfoBUs] = React.useState();
    const [folhas, setFolhas] = React.useState();

    React.useEffect(() => {
        axios.get(`${bu_api_url}/infoBUs?id=${id_inicial}&id_final=${id_final}`)
        .then(async response => {
            setInfoBUs(response.data)
            axios.get(`${bu_api_url}/infoBUs/tree/leaf?id=${id_inicial}&id_final=${id_final}`)
            .then(async response => {
                setFolhas(response.data)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }, [id_inicial, id_final])

    const verificaProvaDeInclusao = async (folhas) => {
        const root = await getRoot()
        let leaves = folhas.map((leaf) => {
            return {...leaf, resultadoProvaDeInclusao: verifyProof(leaf.leaf, root, leaf.proof)}
        })
        console.log('Resultado da prova de inclusão: ', leaves)
        return leaves
    }
    
    if (infoBUs && folhas) {
        console.log('InfoBUS: ', infoBUs)
        console.log('Recontabilização: ', votosTotal(infoBUs))
        console.log('Folhas da árvore', folhas)
        verificaProvaDeInclusao(folhas)
    }
        
    return (
        <>
            <div>id_inicial: {id_inicial}</div>
            <div>id_final: {id_final}</div>
        </>
    );
}
 
export default VerificacaoCompleta;