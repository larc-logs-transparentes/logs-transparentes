import React, { useEffect, useState } from "react";
import CorrectIcon from "../../../assets/Correto.svg";
import ErrorIcon from "../../../assets/Incorreto.svg";
import LoadingIcon from "../../../assets/loading.png";
import {
  verifySingleData,
  getDataProofsFromBU,
} from "../../../services/verifications.js";
import { getTrustedRoot } from "../../../endpoints/merkletree.api.js";
import InclusionCheckCard from "./InclusionCheckCard";

export default function Selo({ bu }) {
  const [isProofTrue, setIsProofTrue] = useState("loading");
  const [isInclusionCheckCardModalOpen, setIsInclusionCheckCardModalOpen] =
    useState(false);
  const [proofs, setProofs] = useState("");

  useEffect(() => {
    const run = async () => {
      const buBinario = bu["bu"];
      const proofs = await getDataProofsFromBU(bu);
      const root = await getTrustedRoot();

      const results = await Promise.all(
        proofs.map(
          async (proof) => await verifySingleData(buBinario, proof, root)
        )
      );

      const isAllResultsTrue = results.every((element) => element === "True");

      setProofs(proofs);
      setIsProofTrue(isAllResultsTrue);
      console.log("Resultado da prova de inclusão:", isAllResultsTrue);
    };
    run();
  }, []);

  const handleModalToggle = () => {
    if (isProofTrue === true) {
      setIsInclusionCheckCardModalOpen(!isInclusionCheckCardModalOpen);
    } else {
      setIsInclusionCheckCardModalOpen(!isInclusionCheckCardModalOpen);
    }
  };

  const verificationIconRender = () => {
    if (isProofTrue === true) {
      return <img src={CorrectIcon} alt="Verificação Correta" className="" />;
    }
    if (isProofTrue === "loading") {
      return <img src={LoadingIcon} alt="Carregando" className="h-16 w16" />;
    } else {
      return <img src={ErrorIcon} alt="Erro na Verificação" className="" />;
    }
  };

  return (
    <>
      <div onClick={handleModalToggle} className="cursor-pointer">
        <p>{verificationIconRender()}</p>
      </div>
      {isInclusionCheckCardModalOpen && (
        <InclusionCheckCard
          bu={bu}
          proofs={proofs}
          isProofTrue={isProofTrue}
          closeModal={() => setIsInclusionCheckCardModalOpen(false)}
        />
      )}
    </>
  );
}
