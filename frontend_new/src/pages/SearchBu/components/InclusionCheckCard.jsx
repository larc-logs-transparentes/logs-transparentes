import React, { useEffect, useState, useRef } from "react";
import ErrorIcon from "../../../assets/ErrorIcon.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const InclusionCheckCard = ({ closeModal, bu, proofs, isProofTrue }) => {
  const [buHash, setBuHash] = useState("");
  const navigate = useNavigate();
  const modalRef = useRef("");

  useEffect(() => {
    const run = async () => {
      const election = bu.eleicoes[0];
      setBuHash(bu.merkletree_info[election].hash);
    };

    run();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  function downloadDataProof() {
    const json = JSON.stringify(proofs, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dataProof.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateToInclusion() {
    navigate(`#`);
  }

  function renderLocalTrees() {
    return proofs.map((proof) => (
      <div className="mb-3">
        <strong className="text-blue-light">
          Árvore Local: {proof.local_tree.local_root.tree_name}
        </strong>
        <div>Nome: {proof.local_tree.local_root.tree_name}</div>
        <div>Raiz: {proof.local_tree.local_root.value}</div>
        <div>Última atualização: {proof.local_tree.local_root.timestamp} </div>
        <div>Tamanho: {proof.local_tree.local_root.tree_size}</div>
      </div>
    ));
  }

  function renderHeader() {
    return isProofTrue ? (
      <div>
        <div className="font-bold  text-blue-light flex items-center gap-2">
          <CheckCircleIcon style={{ color: "#66FF99" }} />
          <h2>Este BU foi verificado corretamente</h2>
        </div>
        <div className="text-gray text-sm mb-4">
          Ele está presente na árvore e não pode ser modificado
        </div>
      </div>
    ) : (
      <div>
        <div className="font-bold  text-red-light flex items-center gap-2">
          <img src={ErrorIcon} />
          <h2>Erro ao Validar o BU</h2>
        </div>
        <div className="text-gray text-sm mb-4">
          O BU não está presente na árvore ou foi alterado
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur z-30 justify-center items-center">
      <div className="relative w-[800px] min-h-[320px] border-2 border-blue rounded-2xl bg-white p-8" ref={modalRef}>
        <div className="absolute top-3 right-3">
          <HighlightOffIcon
            onClick={closeModal}
            className="text-blue cursor-pointer mr-[16px]"
            style={{ width: "32px", height: "32px" }}
          />
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Verificação de inclusão de BU
        </h2>
        <div className="flex gap-8">
          {renderHeader()}

          <h2
            className="text-center  text-md relative font-sans font-bold text-yellow underline cursor-pointer"
            onClick={navigateToInclusion}
          >
            Saiba Mais
          </h2>
        </div>

        <div className="text-sm  font-bold text-gray">
          <div className="mb-3">
            <strong className="text-blue-light">BU:</strong>
            <div>Hash: {buHash}</div>
          </div>

          <div className="mb-3">
            <strong className="text-blue-light">Árvore Global:</strong>
            <div>Raiz: {proofs[0].global_root.value}</div>
            <div>Última atualização: {proofs[0].global_root.timestamp}</div>
            <div>Assinatura: {proofs[0].global_root.signature}</div>
          </div>

          {renderLocalTrees()}
        </div>

        <div className="flex gap-4">
          <button
            onClick={downloadDataProof}
            className="rounded-full bg-yellow px-2 h-[37px] w-[132px] font-bold"
          >
            Baixar Provas
          </button>
        </div>
      </div>
    </div>
  );
};

export default InclusionCheckCard;
