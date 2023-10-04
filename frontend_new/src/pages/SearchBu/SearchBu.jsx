// ./components/HomePage.jsx
import React from 'react';
import SearchBar from '../../components/SearchBar';  
import ShowBu from './components/ShowBu';
import Footer from '../../components/Footer';

function SearchBu() {
  return (
    <div>
      <SearchBar />
      <ShowBu />
      <Footer />
    </div>
  );
}

export default SearchBu;
