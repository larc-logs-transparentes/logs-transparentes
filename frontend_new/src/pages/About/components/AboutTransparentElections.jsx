import React from 'react';
import LogoUSP from '../../../assets/Logousp.svg';
import LogoUFSCAR from '../../../assets/LogoUFSCar.svg';
import LogoIFSC from '../../../assets/IFSC_logo_vertical.svg';

const AboutTransparentElections = () => {
  return (
    <div className="w-6xl mx-auto mb-12 font-inter">
      <h1 className="text-center border-b border-black pb-2 text-2xl font-bold">
        Eleições Transparentes
      </h1>

      <h2 className="text-center mt-8 text-xl font-semibold">Como funciona</h2>
      
      <h3 className="text-center mt-2 italic text-lg">O poder dos Logs Transparentes</h3>
      
      <p className="text-center my-4">
        “Eleições Transparentes” salva dados eleitorais em <em>logs transparentes</em>, de modo que qualquer manipulação é facilmente detectável. Assim, você pode:
      </p>

      <div className="mb-6">
        <h4 className="font-semibold">Verificar BUs e outros arquivos</h4>
        <p>
          Confira os BUs (documento com os votos recebidos pela urna), e tenha certeza de que nunca mais serão alterados.
        </p>
        <p className="text-center text-gray-500">&lt;link para consultar BUs&gt;</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-red-600">Recontabilizar os votos</h4>
        <p>
          Você pode baixar todos os BUs, <em>verificar</em>, somar, e comparar o resultado com o oficial.
        </p>
        <p className="text-center text-gray-500">&lt;link para github com instruções&gt;</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold">Monitorar os logs transparentes</h4>
        <p>
          Acompanhe as raízes dos logs transparentes e detecte qualquer manipulação.
        </p>
        <p className="text-center text-gray-500">&lt;seja um monitor&gt;</p>
      </div>

      <hr className="my-8" />

      <h2 className="text-center mt-8 text-xl font-semibold">Os Monitores</h2>
      <p className="text-center mb-8">
        Diversas entidades agem como monitores, analisando os dados, fiscalizando logs transparentes, e verificando a integridade das eleições.
      </p>

        <div className="flex justify-between text-center mb-8">
        <div className="w-1/3">
            <div className="p-4">
            <img src={LogoUSP} alt="Logo da USP" className="mx-auto mb-2 w-24 h-24 object-contain invert" />
            <p>Universidade de São Paulo</p>
            <p>&lt;Link&gt;</p>
            </div>
        </div>
        <div className="w-1/3">
            <div className="p-4">
            <img src={LogoUFSCAR} alt="Logo da UFSCAR" className="mx-auto mb-2 w-24 h-24 object-contain" />
            <p>Universidade Federal de São Carlos</p>
            <p>&lt;Link&gt;</p>
            </div>
        </div>
        <div className="w-1/3">
            <div className="p-4">
            <img src={LogoIFSC} alt="Logo do IFSC" className="mx-auto mb-2 w-24 h-24 object-contain" />
            <p>Instituto Federal de Santa Catarina</p>
            <p>&lt;Link&gt;</p>
            </div>
        </div>
        </div>



      <p className="text-center text-gray-500">&lt;Acesse a lista completa&gt;</p>
    </div>
    
  );
}

export default AboutTransparentElections;
