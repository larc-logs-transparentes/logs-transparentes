import React from 'react';
import '../../index.css';

import DragAndDrop from './components/DragAndDrop';
import Header from './components/Header'; 
import History from './components/History';
import ResultsButton from './components/ResultsButton';

import Footer from '../../components/Footer';
import SearchButton from './components/SearchButton';  

function HomePage() {

  return (
    <div className='flex flex-col custom-scrollbar'>
      <Header />
      <History/>
      <DragAndDrop/>
      <SearchButton/>
      <ResultsButton/>
      <Footer/>
    </div>
  );
}

export default HomePage;
