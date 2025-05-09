import React from 'react';
import './HeroSection.css'; // Import the CSS file
import hero from "../proj_img/herosection.webp";
import hero1 from "../proj_img/hero1.webp"
import { Link } from 'react-router-dom';


const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Side: Information */}
        <div className="hero-left">
          <h1 className="hero-heading">Welcome to <span className='mat'> Code Matrix...</span> <br/><br/> " Code Together, Build Smarter – With Collaborative Coding "</h1>
          <p className="hero-subheading">Your one-stop platform for coding collaboration.</p>
          <p className="hero-description">
            Code Matrix connects developers around the world to work together, learn, and build innovative projects. 
            Join a community of passionate coders and take your skills to the next level!
            <br/>
            <br/>
          </p>
          <button className="cta-button"><Link to="/code" className="menu-link">Start Code</Link></button>
        </div>

        {/* Right Side: Image */}
        <div className="hero-right">
          <img src={hero1} alt="Code Matrix Project" className="hero-image"/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
