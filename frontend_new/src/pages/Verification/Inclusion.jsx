import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';  
import { getBuById } from '../../endpoints/bu.api';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import VerifyInclusion from './components/VerifyInclusion';

function Inclusion() {
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
      <VerifyInclusion id={id}/>
      <Footer />
    </div>
  );
}

export default Inclusion;