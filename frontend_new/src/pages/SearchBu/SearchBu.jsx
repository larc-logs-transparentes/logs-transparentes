import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';  
import Footer from '../../components/Footer';
import Bu from './components/Bu';
import Result from './components/Result';
import { getBuById } from '../../endpoints/bu.api';
import { useParams } from 'react-router-dom';
import ManualAutomatic from './components/ManualAutomatic';
import Warning from './components/Warning';

function SearchBu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [buData, setBuData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const response = await getBuById(id);
        if (response) {
          const buInteiroParsed = JSON.parse(response.bu_inteiro);
          setBuData(buInteiroParsed);
        }
      }
    };

    fetchBu();
  }, [id]);

  return (
    <div>
      <SearchBar />
      {isModalOpen && <ManualAutomatic closeModal={() => setIsModalOpen(false)} />}
      {isWarningVisible && <Warning />}
      {id ? (
        <div className='flex place-content-center p-[20px]'>
          <div className='flex-col items-center space-y-[20px]'>     
            <Bu onSendToMonitor={() => setIsWarningVisible(true)} id={id} />
            <Result cargo="presidente" />
            <Result cargo="governador" />
            <Result cargo="senador" />
            <Result cargo="deputado federal" />
            <Result cargo="deputado estadual" />
          </div>
        </div>
      ) : (
        <div className='h-[500px]'></div>
      )}
      <Footer />
    </div>
  );
}

export default SearchBu;
