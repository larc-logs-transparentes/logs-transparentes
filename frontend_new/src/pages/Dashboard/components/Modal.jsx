import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalclosebutton from '../../../assets/modalclosebutton.svg';
import modalbaixarfolhasbutton from '../../../assets/modalbaixarfolhasbutton.svg';

const Modal = ({ isOpen, onClose, card, isFirst }) => {
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
      try {
        if (isFirst) {
          const response = await fetch('http://localhost:8080/tree/all-roots-global-tree');
          const data = await response.json();
          setNumeroValue(data.roots[data.roots.length - 1].tree_size);
        } else if (card && card.info) {
          const response = await fetch(card.info);
          const data = await response.json();
          setNumeroValue(data.length);
        }
      } catch (error) {
        console.error('Erro ao buscar valor do número:', error);
        setNumeroValue('Erro ao carregar valor');
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
            second: '2-digit',
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
  }, [card, isFirst]);

  if (!isOpen || !card) return null;

  const downloadLeaf = async () => {
    const downloadUrl = isFirst ? 'http://localhost:8080/tree/all-leaf-data-global-tree' : card.downloadUrl;
    if (downloadUrl) {
      try {
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error('Erro ao baixar o arquivo');

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Folhas_da_${card.title}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Erro ao fazer download:', error);
        alert('Erro ao fazer download.');
      }
    } else {
      alert('URL de download não disponível.');
    }
  };

  const subtitle = isFirst ? 'global' : card.subtitle;
  const description = isFirst ? 'Raiz da árvore global' : card.description;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg border border-[#1094AB] shadow-lg w-11/12 max-w-md md:max-w-2xl">
        <div className="relative mb-4">
          <h2 className="text-2xl font-inter font-size-24px text-[#1094AB] mb-4">
            Árvore {subtitle}
            <button className="absolute top-0 right-0" onClick={onClose}>
              <img src={modalclosebutton} alt="Botão de fechar" className="w-6 h-6 rounded" />
            </button>
          </h2>
        </div>
        <p className="font-inter font-size-16px text-black mb-4 break-words">{description}</p>
        <div className="rounded-lg flex flex-col gap-4">
          <div className="border border-gray rounded-lg p-2 break-words">
            <h1 className="text-[#1094AB] font-inter font-size-14px text-left ml-2">Raiz {subtitle}</h1>
            <h2 className="text-[#979797] font-inter font-size-15px ml-2 break-words">
              Hash: <span className="font-bold">{hashValue}</span>
            </h2>
            <h2 className="text-[#979797] font-inter font-size-15px ml-2">
              Gerado em: <span className="font-bold">{timestampValue}</span>
            </h2>
          </div>
          <div className="border border-gray rounded-lg p-2 break-words">
            <h1 className="text-[#1094AB] font-inter font-size-14px text-left ml-2">Elementos</h1>
            <h2 className="text-[#979797] font-inter font-size-15px ml-2">
              Número: <span className="font-bold">{numeroValue}</span>
            </h2>
          </div>
        </div>
        <div className="relative mt-4 flex justify-start">
          <button className="gap-4" onClick={downloadLeaf}>
            <img src={modalbaixarfolhasbutton} alt="Botão de baixar folhas" className="w-[131px] h-[35px]" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
