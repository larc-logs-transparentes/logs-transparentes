import React from 'react';
import Footer from '../../components/Footer';
import '../../index.css';
import Cards from './components/Cards';

const Dashboard = () => {
  return (
    <div className="flex flex-col custom-scrollbar">
      <div className="flex">
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
