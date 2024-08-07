import React from 'react';
import Footer from '../../components/Footer';
import '../../index.css';
import Mascara from '../../assets/Mascara.svg';
import Cards from './components/Cards';

const Dashboard = () => {
  return (
    <div className='overflow-x-hidden h-[80vh] md:h-[72vh] md:min-h-[780px]'>
      <div className='relative font-sans'>
        <div className='h-full text-center font-bold flex items-center justify-center relative'>
          <img src={Mascara} className='absolute right-0 h-[105px] w-[909px] top-0 ' alt='Mascara' />
          <div className='bg-blue md:h-[10.45vh] min-h-[105px] md:min-h-[105px] w-full absolute top-0 left-0 opacity-70'></div>
          <h1 className='text-white text-xl p-4 md:text-3xl md:p-8 mt-2 z-30'>
            Mais informações sobre as árvores das eleições
          </h1>
        </div>
      </div>
      
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col items-center justify-center">
          <Cards />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
