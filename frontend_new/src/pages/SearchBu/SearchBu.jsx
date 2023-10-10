import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';  
import Footer from '../../components/Footer';
import Bu from './components/Bu';
import Result from './components/Result';
import SendBu from './components/SendBu';

function SearchBu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <SearchBar />
      {isModalOpen && <SendBu closeModal={closeModal} />}
      <div className='flex place-content-center p-[20px]'>
        <div className='flex-col space-y-[20px]'>     
          <Bu />
          <Result />
          <Result />
          {/* Adding buttons here below the last Result component */}
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[194px] ml-[256px] font-bold">Enviar para o Monitor</button>
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[102px] ml-[16px] font-bold">Baixar Bu</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchBu;
