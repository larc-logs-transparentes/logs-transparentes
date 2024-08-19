import React from 'react';
import AboutTransparentElections from './components/AboutTransparentElections';
import Footer from '../../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center">
    <AboutTransparentElections />
    <Footer />
    </div>
    
  );
}

export default About;
