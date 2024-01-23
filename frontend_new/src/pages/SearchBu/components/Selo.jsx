import React, { useEffect,useState } from 'react';
import Correto from '../../../assets/Correto.svg';
import {verifySingleData} from '../../../services/verifications.js';

export default function Selo(props) {
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
          src={ isProofTrue === 'True' ? Correto : 'false' }
          alt="Verificação"
        />
      </p>
    </div>
  );
}