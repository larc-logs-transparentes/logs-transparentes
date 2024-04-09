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

  const showWarning = () => setIsWarningVisible(true);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const downloadJson = () => {
    if (!buData) return;
    const json = JSON.stringify(buData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buData.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const response = await getBuById(id);
        if (response) {
          const buInteiroParsed = JSON.parse(response.bu_json);
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
      <div className='flex place-content-center p-[20px]'>
        <div className='flex-col items-center space-y-[20px]'>     
          <Bu onSendToMonitor={showWarning} id={id} />
          <Result cargo="presidente" />
          <Result cargo="governador" />
          <Result cargo="senador" />
          <Result cargo="deputado federal" />
          <Result cargo="deputado estadual" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchBu;
