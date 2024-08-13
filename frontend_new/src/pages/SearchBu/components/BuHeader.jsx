import React, { useState, useEffect } from 'react';
import { getBuById } from '../../../endpoints/bu.api';
import { useParams } from 'react-router-dom';
import Selo from './Selo';

function BuHeader({ onSendToMonitor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [buData, setBuData] = useState(null);
  const [bu, setBu] = useState(null);

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const bu = await getBuById(id);
        // TODO: get bu from BU raw data
        const buInteiroParsed = JSON.parse(bu.bu_json);
        setBuData(buInteiroParsed);
        setBu(bu);
      }
    };

    fetchBu();
  }, [id]);

  

  function downloadJson() {
    const json = JSON.stringify(buData, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buData.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!buData) {
    return <div>Loading...</div>;
  }
  const municipio = buData.identificacaoSecao.municipioZona.municipio;
  const zonaEleitoral = buData.identificacaoSecao.municipioZona.zona;
  const secaoEleitoral = buData.identificacaoSecao.secao;
  const localEleitoral = buData.identificacaoSecao.local;
  const eleitoresAptos = buData.resultadosVotacaoPorEleicao[0].qtdEleitoresAptos;
  const comparecimento = buData.resultadosVotacaoPorEleicao[0].resultadosVotacao[0].qtdComparecimento;
  const eleitoresFaltosos = eleitoresAptos - comparecimento;
  const habilitadosPorAnoDeNascimento = buData.qtdEleitoresLibCodigo;
  const codigoCarga = buData.urna.correspondenciaResultado.carga.codigoCarga;
  const dataHoraAbertura = buData.dadosSecaoSA[1]["dataHoraAbertura"];
  const dataHoraEncerramento = buData.dadosSecaoSA[1]["dataHoraEncerramento"];
  const numeroInternoUrna = buData.urna.correspondenciaResultado.carga.numeroInternoUrna;

  


  return (
    <div className="flex items-center justify-center">
      <div className='w-[100%] md2:w-[90vw] md2:min-h-[60vh] justify-center border-2 border-blue-light rounded-2xl p-5 space-y-16'> 

        <div className='flex flex-col items-center gap-[20px] md2:flex-row md2:items-center md2:justify-between '>
          <h1 className='text-blue text-2xl font-medium'>Boletim de Urna</h1>
          <div className='flex items-center md2:flex-row flex-col gap-6'>

            <button onClick={downloadJson} className="rounded-full bg-yellow px-2 h-[37px] w-[102px] font-bold ml-4">Baixar Bu</button>

            <Selo bu={bu} />
          </div>
        </div>

      <div className='space-y-8'>
        <div className='grid md2:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
          <div className='space-y-4 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray text font-bold'>Município:</h1>
            <h1 className='text-blue-light text font-bold'>{municipio}</h1>
          </div>
          <div className='space-y-4 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray  text-base font-bold'>Zona Eleitoral:</h1>
            <h1 className='text-blue-light  text-base font-bold'>{zonaEleitoral}</h1>
          </div>
          <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray  text-base font-bold'>Seção Eleitoral:</h1>
            <h1 className='text-blue-light  text-base font-bold'>{secaoEleitoral}</h1>
          </div>
          <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray  text-base font-bold'>Local de votação:</h1>
            <h1 className='text-blue-light  text-base font-bold'>{localEleitoral}</h1>
          </div>
          <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray  text-base font-bold'>Eleitores aptos:</h1>
            <h1 className='text-blue-light  text-base font-bold'>{eleitoresAptos}</h1>
          </div>
          <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray  text-base font-bold'>Comparecimento:</h1>
            <h1 className='text-blue-light  text-base font-bold'>{comparecimento}</h1>
          </div>
          <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray  text-base font-bold'>Eleitores faltosos:</h1>
            <h1 className='text-blue-light  text-base font-bold'>{eleitoresFaltosos}</h1>
          </div>
          <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
            <h1 className='text-gray  text-base font-bold'>Habitados por ano de nascimento:</h1>
            <h1 className='text-blue-light  text-base font-bold'>{habilitadosPorAnoDeNascimento}</h1>
          </div>
      </div>

      <h1 className='text-black text-base font-bold'>Informações da Urna Eletrônica</h1>
      <div className='grid md2:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray  text-base font-bold'>Código de Identificação UE:</h1>
          <h1 className='text-blue-light  text-base font-bold'>{numeroInternoUrna}</h1>
        </div>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray  text-base font-bold'>Data da Abertura UE:</h1>
          <h1 className='text-blue-light  text-base font-bold'>{dataHoraAbertura}</h1>
        </div>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray  text-base font-bold'>Data de Fechamento UE:</h1>
          <h1 className='text-blue-light  text-base font-bold'>{dataHoraEncerramento}</h1>
        </div>
        <div className='sm:col-span-1 space-y-2 border-[1px] rounded-xl p-2 border-gray '>
          <h1 className='text-gray  text-base font-bold'>Código de identificação da carga:</h1>
          <h1 className='text-blue-light  text-base font-bold break-all'>{codigoCarga}</h1>
        </div>
      </div>
    </div>

    </div>
  </div>
  );
}

export default BuHeader;
