import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalclosebutton from '../../../assets/modalclosebutton.svg';
import modalbaixarfolhasbutton from '../../../assets/modalbaixarfolhasbutton.svg';

const Modal = ({ isOpen, onClose, card }) => {
  const [hashValue, setHashValue] = useState('');
  const [numeroValue, setNumeroValue] = useState('');
  const [timestampValue, setTimestampValue] = useState('');

  useEffect(() => {
    const fetchHashValue = async () => {
      if (card && card.hash) {
        try {
          const response = await fetch(card.hash);
          const data = await response.json();
          setHashValue(data.value);
        } catch (error) {
          console.error('Erro ao buscar valor do hash:', error);
          setHashValue('Erro ao carregar valor');
        }
      }
    };

    const fetchNumeroValue = async () => {
      if (card && card.allroots) {
        try {
          const response = await fetch(card.allroots);
          const data = await response.json();
          const lastTreeSize = data.roots[data.roots.length - 1].tree_size;
          setNumeroValue(lastTreeSize);
        } catch (error) {
          console.error('Erro ao buscar valor do número:', error);
          setNumeroValue('Erro ao carregar valor');
        }
      }
    };

    const fetchTimestampValue = async () => {
      if (card && card.allroots) {
        try {
          const response = await fetch(card.allroots);
          const data = await response.json();
          const lastTimestamp = data.roots[data.roots.length - 1].timestamp;
          const formattedDate = new Date(lastTimestamp).toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          setTimestampValue(formattedDate);
        } catch (error) {
          console.error('Erro ao buscar valor do timestamp:', error);
          setTimestampValue('Erro ao carregar valor');
        }
      }
    };

    fetchHashValue();
    fetchNumeroValue();
    fetchTimestampValue();
  }, [card]);

  if (!isOpen || !card) return null;

  const downloadLeaf = () => {
    if (card.downloadUrl) {
      const link = document.createElement('a');
      link.href = card.downloadUrl;
      link.download = `Folhas da ${card.title}.json`;
      document.body.appendChild(link);
      link.target = "_blank";
      link.click();
      document.body.removeChild(link);
    } else {
      alert('URL de download não disponível.');
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="md:w-[900px] h-[381px] bg-white p-6 rounded-lg border border-[#1094AB] shadow-lg w-96">
        <div className="relative md:w-[852px] h-[29px] mb-4">
          <h2 className="text-2xl font-inter font-size-24px text-[#1094AB] mb-4">
            Árvore {card.title}
            <button className="absolute top-0 right-0" onClick={onClose}>
              <img src={modalclosebutton} alt="Botão de fechar" className="w-6 h-6 rounded" />
            </button>
          </h2>
        </div>
        <p className="font-inter font-size-16px text-black mb-4">{card.description}</p>
        <div className="md:w-[852px] h-[154px] rounded-lg flex flex-col gap-4">
          <div className="md:w-[852px] h-[81px] rounded-lg border border-gray">
            <h1 className="text-[#1094AB] font-inter font-size-14px text-left ml-2">Raiz {card.subtitle}</h1>
            <h2 className="text-[#979797] font-inter font-size-15px ml-12">Hash: {hashValue}</h2>
            <h2 className="text-[#979797] font-inter font-size-15px ml-1.5">Gerado em: {timestampValue}</h2>
          </div>
          <div className="md:w-[852px] h-[57px] rounded-lg border border-gray">
            <h1 className="text-[#1094AB] font-inter font-size-14px text-left ml-2">Elementos</h1>
            <h2 className="text-[#979797] font-inter font-size-15px ml-6">Número: {numeroValue}</h2>
          </div>
        </div>
        <div className="relative md:w-[852px] h-[29px] mb-4">
          <h2 className="text-2xl font-inter font-size-24px text-[#1094AB] mb-4">
            <button className="absolute bottom-0 left-0 gap-4" onClick={downloadLeaf}>
              <img src={modalbaixarfolhasbutton} alt="Botão de baixar folhas" className="w-[131px] h-[35px]" />
            </button>
          </h2>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
