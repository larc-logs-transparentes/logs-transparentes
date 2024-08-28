import React from 'react';
import '../../index.css';

import DragAndDrop from './components/DragAndDrop';
import Header from './components/Header'; 
import History from './components/History';

import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';  
import SearchBarUSP from '../../components/SearchBarUSP';

function HomePage() {

  return (
    <div className='flex flex-col custom-scrollbar'>
      <Header />
      <History/>
      <DragAndDrop/>
      <SearchBar/>
      <SearchBarUSP/>
      <Footer/>
    </div>
  );
}

export default HomePage;
