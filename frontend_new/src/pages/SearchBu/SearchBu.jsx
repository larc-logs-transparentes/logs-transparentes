import React, { useState,useEffect} from 'react';
import SearchBar from '../../components/SearchBar';  
import Footer from '../../components/Footer';
import Bu from './components/Bu';
import Result from './components/Result';
import SendBu from './components/SendBu';
import { getBuById } from '../../endpoints/bu.api';
import { useParams } from 'react-router-dom';
import ManualAutomatic from './components/ManualAutomatic';
import Warning from './components/Warning';

function SearchBu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const { id } = useParams();

  const showWarning = () => setIsWarningVisible(true);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const res = await getBuById(id);
      }
    };

    fetchBu();
  }, [id]);

  return (
    <div className=''>
      <SearchBar />
      {isModalOpen && <ManualAutomatic className='' closeModal={() => setIsModalOpen(false)} />}
      {isWarningVisible && <Warning />}
      <div className='flex place-content-center p-[20px]'>
        <div className='flex-col items-center space-y-[20px]'>     
          <Bu onSendToMonitor={showWarning} id={id} />
          <Result cargo="presidente" />
          <Result cargo="governador" />
          <Result cargo="senador" />
          <Result cargo="deputado federal" />
          <Result cargo="deputado estadual" />
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] md2:ml-[40%] md2:w-[25%] font-bold ml-[1%]">Enviar para o Monitor</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchBu;
