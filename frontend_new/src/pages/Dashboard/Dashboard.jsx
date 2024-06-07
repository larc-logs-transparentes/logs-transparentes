import React from 'react';
import Footer from '../../components/Footer';
import '../../index.css';
import Cards from './components/Cards';


const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col items-center justify-center">
                <Cards />
            </main>
            <Footer />

        </div>
    );
};

export default Dashboard;