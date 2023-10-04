// ./components/HomePage.jsx
import React from 'react';
import Header from './components/Header'; 
import SearchBar from '../../components/SearchBar';  
import Footer from '../../components/Footer';

function HomePage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Footer />
    </div>
  );
}

export default HomePage;
