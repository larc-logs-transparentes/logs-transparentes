import React from 'react'
import { useParams } from 'react-router-dom';
const VerificacaoCompleta = () => {
    const { id_inicial, id_final } = useParams();
    return ( 
        <>
            <div>id_inicial: {id_inicial}</div>
            <div>id_final: {id_final}</div>
        </>
     );
}
 
export default VerificacaoCompleta;