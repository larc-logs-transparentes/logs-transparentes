import React from 'react';
import Header from './components/Header'; 
import SearchBar from '../../components/SearchBar';  
import Footer from '../../components/Footer';
import '../../index.css';
import DragAndDrop from './components/DragAndDrop';
import History from './components/History';

function HomePage() {

  return (
    <div className='flex flex-col custom-scrollbar'>
      <Header />
      <History/>
      <DragAndDrop/>
      <SearchBar/>
      <Footer/>
    </div>
  );
}

export default HomePage;
