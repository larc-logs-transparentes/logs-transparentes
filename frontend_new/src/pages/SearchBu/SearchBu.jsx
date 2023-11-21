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
        <div className='flex-col items-center space-y-[20px]'>     
          <Bu />
          <Result />
          <Result />
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] md2:ml-[40%] md2:w-[20%] font-bold ml-[1%]">Enviar para o Monitor</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchBu;
