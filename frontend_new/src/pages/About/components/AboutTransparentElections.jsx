import React from 'react';
import LogoUSP from '../../../assets/Logo-USP.svg';
import LogoUFSCAR from '../../../assets/logo-ufscar.svg';
import LogoIFSC from '../../../assets/IFSC_logo_vertical.svg';
import BUIcon from '../../../assets/dashboardBU.svg';
import VoteIcon from '../../../assets/Votacao.svg';
import LogIcon from '../../../assets/Iconlogs.svg';
import Mascara from '../../../assets/Mascara.svg';
import GitHubIcon from '../../../assets/github-mark.svg';

const monitors = [
  {
    name: "Universidade de São Paulo",
    logo: LogoUSP,
    alt: "Logo da USP",
    linkText: "Página oficial do monitor",
  },
  {
    name: "Universidade Federal de São Carlos",
    logo: LogoUFSCAR,
    alt: "Logo da UFSCAR",
    linkText: "Página oficial do monitor",
  },
  {
    name: "Instituto Federal de Santa Catarina",
    logo: LogoIFSC,
    alt: "Logo do IFSC",
    linkText: "Página oficial do monitor",
  },
];


const AboutTransparentElections = () => {
  return (
    <div className="w-full flex flex-col mx-auto font-inter">

      <div className='relative font-sans'>
        <div className='h-full text-center font-bold flex items-center justify-center relative'>
          <img 
            src={Mascara} 
            className='absolute right-0 w-[909px] top-0 md:h-[105px]' 
            alt='Mascara' 
          />
          <div className='bg-blue h-full md:h-[10.45vh] min-h-[80px] md:min-h-[105px] w-full absolute top-0 left-0 opacity-70'></div>
          <h1 className='text-white text-3xl p-2 md:text-4xl md:p-8 mt-2 z-10'>
            Eleições Transparentes: Como funciona
          </h1>
        </div>
      </div>

      <h3 className="text-center mt-2 text-blue-dark italic text-2xl">O poder dos Logs Transparentes</h3>
      
      <p className="text-center text-lg my-4 m-4">
        “Eleições Transparentes” salva dados eleitorais em <em>logs transparentes</em>, de modo que qualquer manipulação é facilmente detectável. Assim, você pode:
      </p>

      <div className="flex flex-wrap justify-center m-6 gap-8">
        <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-blue text-white flex flex-col justify-between">
          <div className="px-6 py-4">
            <img src={BUIcon} alt="Ícone de BU" className="mx-auto mb-2 w-24 h-24 object-contain invert" /> 
            <div className="relative font-bold text-xl mb-2">Verificar BUs e outros arquivos</div>
            <p className="text-base">
              Confira os BUs (documento com os votos recebidos pela urna), e tenha certeza de que nunca mais serão alterados.
            </p>
          </div>
          <div className="flex px-6 pt-2 pb-2 m-2">
            <button
              className="flex items-center inline-block rounded-xl bg-yellow px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              Consulte os BUs
            </button>
          </div>
        </div>

        <div className="max-w-sm rounded-xl border border-blue overflow-hidden shadow-lg bg-white text-blue flex flex-col justify-between">
          <div className="px-6 py-4">
            <img src={VoteIcon} alt="Ícone de Voto" className="mx-auto mb-2 w-24 h-24 object-contain" /> 
            <div className="relative font-bold text-xl mb-2">Recontabilizar os votos</div>
            <p className="text-base">
              Você pode baixar todos os BUs, <em>verificar</em>, somar, e comparar o resultado com o oficial.
            </p>
          </div>
          <div className="flex px-6 pt-2 pb-2 m-2">
            <button
              className="flex items-center inline-block border border-bg-blue rounded-xl bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              <img src={GitHubIcon} alt="GitHub" className="w-4 h-4 mr-2" />
              GitHub com instruções
            </button>
          </div>
        </div>

        <div className="max-w-sm rounded-xl border border-blue overflow-hidden shadow-lg bg-blue text-white flex flex-col justify-between">
          <div className="px-6 py-4">
            <img src={LogIcon} alt="Ícone de Voto" className="mx-auto mb-2 w-24 h-24 object-contain" /> 
            <div className="relative font-bold text-xl mb-2">Monitorar os logs transparentes</div>
            <p className="text-base">
              Acompanhe as raízes dos logs transparentes e detecte qualquer manipulação.
            </p>
          </div>
          <div className="flex px-6 pt-2 pb-2 m-2">
            <button
              className="flex items-center inline-block rounded-xl bg-yellow px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              Seja um monitor
            </button>
          </div>
        </div>
      </div>

      <div className='w-full bg-[#d2f6ff] pb-4'>
        <h3 className="text-center mt-2 text-blue-dark italic text-2xl">Os Monitores</h3>
        <p className="text-center text-lg mx-2 my-4 mb-8">
          Diversas entidades agem como monitores, analisando os dados, fiscalizando logs transparentes, e verificando a integridade das eleições.
        </p>
        <div className="flex-row justify-center">
          <div className="flex flex-row overflow-x-auto md:flex-wrap md:justify-center gap-2 md:gap-2 max-w-8xl whitespace-nowrap">
            {monitors.map((monitor, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 md:w-1/3 p-4">
                <div className="max-w-sm rounded-xl border border-blue overflow-hidden shadow-lg bg-white text-blue flex flex-col justify-between">
                  <div className="px-6 py-4">
                    <img src={monitor.logo} alt={monitor.alt} className="mx-auto mb-2 w-24 h-24 object-contain" />
                    <p className="text-center font-bold">{monitor.name}</p>
                  </div>
                  <div className="flex justify-center mt-4 mb-4">
                    <button
                      className="flex items-center inline-block rounded-xl bg-[#0c77a8] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600">
                      {monitor.linkText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default AboutTransparentElections;
