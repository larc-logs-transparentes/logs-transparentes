import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Certificate = ({ closeModal }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-30 justify-center items-center'>
      <div className='relative w-[714px] min-h-[500px] border-2 border-black rounded-2xl bg-white p-8'> 
        <div className="absolute top-3 right-3">
        <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer mr-[16px]" style={{ width: '32px', height: '32px' }}/>
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-800">Visualizador do certificado: TL Election</h2>
        <h2 className="font-bold mb-4 text-gray-800">Preencha as informações abaixo para enviar para o Monitor.</h2>
        <div className="flex gap-4">
            <button  className="rounded-full bg-yellow px-2 h-[37px] w-[102px] font-bold ml-4">Geral</button>
            <button  className="rounded-full bg-gray px-2 h-[37px] w-[102px] font-bold ml-4">Detalhe</button>
        </div>

        <div className="text-sm p-4 font-bold text-gray">
          <div className="mb-3">
            <strong className='text-blue'>Emitido para:</strong>
            <div>Nome comum (CN): tlelection.com.br</div>
            <div>O (Organização): TL Election</div>
            <div>Unidade organizacional (OU): &lt;Não faz parte do certificado&gt;</div>
          </div>

          <div className="mb-3">
            <strong className='text-blue'>Emitido por:</strong>
            <div>Nome comum (CN): DigiCert Global G2 TLS RSA SHA256 2020 CA1</div>
            <div>O (Organização): DigiCert Inc</div>
            <div>Unidade organizacional (OU): &lt;Não faz parte do certificado&gt;</div>
          </div>

          <div className="mb-3">
            <strong className='text-blue'>Período de validade:</strong>
            <div>Emitido em: terça-feira, 23 de maio de 2023 às 21:00:00</div>
            <div>Expira em: domingo, 23 de junho de 2024 às 20:59:59</div>
          </div>

          <div className="mb-3">
            <strong className='text-blue'>Impressões digitais SHA 256:</strong>
            <div>Certificado: a67837797jsh7368274bhada97a498bkjsa9379</div>
            <div>Chave pública: 347649shksjgs9387fh949937hf949j3d3odfh97</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Certificate;
