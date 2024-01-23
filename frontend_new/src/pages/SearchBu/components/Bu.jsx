import React, { useState,useEffect } from 'react';
import Correto from '../../../assets/Correto.svg';
import SendBu from './SendBu';
import { getBuById } from '../../../endpoints/bu.api';
import { useParams } from 'react-router-dom';
import Selo from './Selo';

function Bu() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams(); // Extract id from URL
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const [buData, setBuData] = useState(null);

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const bu = await getBuById(id);
        const buInteiroParsed = JSON.parse(bu.bu_inteiro);
        setBuData(buInteiroParsed);
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
      <div className='w-[80vw] md2:w-[892px] md2:h-[403px] justify-center border-2 border-blue-light rounded-2xl p-5 space-y-4'> 

        <div className='flex flex-col items-center gap-[20px] md2:flex-row md2:items-center md2:justify-between'>
          <h1 className='text-blue text-base font-bold'>Boletim de Urna</h1>
          <div className='flex items-center md2:flex-row flex-col gap-6'>
          {isModalOpen && <SendBu closeModal={closeModal} />}
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[194px] font-bold ml-4 hidden md2:block">Enviar para o Monitor</button>
          <button onClick={downloadJson} className="rounded-full bg-yellow px-2 h-[37px] w-[102px] font-bold ml-4">Baixar Bu</button>
          <Selo id={id} />
          <img src={Correto} className='h-[60px] w-[62.4px] ml-4' alt='Mascara' />
        </div>
        </div>

        <div className='space-y-4'>
          <div className='grid md2:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Município:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{municipio}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Zona Eleitoral:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{zonaEleitoral}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Seção Eleitoral:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{secaoEleitoral}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Local de votação:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{localEleitoral}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Eleitores aptos:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{eleitoresAptos}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Comparecimento:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{comparecimento}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Eleitores faltosos:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{eleitoresFaltosos}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Habitados por ano de nascimento:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{habilitadosPorAnoDeNascimento}</h1>
            </div>
          </div>

          <h1 className='text-black text-base font-bold'>Urna Eletrônica - Correspondência Efetivada</h1>
          <div className='grid md2:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Tipo de Arquivo:</h1>
              <h1 className='text-blue-light text-xs font-bold'>Urna Eletrônica</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Código de Identificação UE:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{numeroInternoUrna}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Data da Abertura UE:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{dataHoraAbertura}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Data de Fechamento UE:</h1>
              <h1 className='text-blue-light text-xs font-bold'>{dataHoraEncerramento}</h1>
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
            <div className='sm:col-span-2 space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Código de identificação da carga:</h1>
              <h1 className='text-blue-light text-xs font-bold break-all'>{codigoCarga}</h1>
            </div>
            <div className='sm:col-span-1 space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Código de identificação MC:</h1>
              <h1 className='text-blue-light text-xs font-bold'>não achei</h1>
            </div>
            <div className='sm:col-span-1 space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Resumo da correspondência:</h1>
              <h1 className='text-blue-light text-xs font-bold'>não achei</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bu;
