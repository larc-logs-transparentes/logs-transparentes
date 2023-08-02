import React, { useEffect,useState } from 'react';
import cadVerde from '../../../assets/images/cad-verde.png';
import cadVermelho from '../../../assets/images/cad-vermelho.png';
import { verifySingleData } from '../../../services/verifications.js';

export default function Cadeado(props) {
  const [isProofTrue, setIsProofTrue] = useState("(loading...)");
  
  useEffect(() => {
    const run = async () => {
      const isProofTrue = await verifySingleData(props.id);
      console.log(isProofTrue)
      setIsProofTrue(isProofTrue);
    };
    run();
  }, [props.id]);

  return (
    <div>
      <p>
        <img
          src={ isProofTrue === 'True' ? cadVerde : cadVermelho }
          alt="estado"
        />
      </p>
    </div>
  );
}