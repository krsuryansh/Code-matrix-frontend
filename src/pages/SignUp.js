import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Signup from '../components/Signup';
import FooterSection from '../components/FooterSection';
// import CodeEditor from '../components/CodeEditor';

const SignUp = () => {
    const nav = {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        background:'#151212'
      };
  return (
    <div>
      <Navbar />
      <div style={nav}><Signup/></div>
      
      <FooterSection/>
    </div>
  );
};

export default SignUp;