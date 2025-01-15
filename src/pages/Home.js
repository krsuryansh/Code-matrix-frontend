import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import FooterSection from '../components/FooterSection';
// import CodeEditor from '../components/CodeEditor';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <FeatureSection /> 
      
      <FooterSection/>
    </div>
  );
};

export default Home;