import React, { useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import FooterSection from '../components/FooterSection';
import { DataContext } from '../DataContext';


const Home = () => {
  const { setIslogin } = useContext(DataContext);


  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <FooterSection />
    </div>
  );
};

export default Home;
