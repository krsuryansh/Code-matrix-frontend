import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Navbar.css';  
import logo from "../proj_img/logo.png"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Text Container */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} className="proj-logo" alt="Project Logo" />
          </Link>
          <Link to="/" className="logo-link">
            <div className="logo">Code <span className='mat'>Matrix</span></div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className={`menu-items ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="menu-link">Home</Link>
          <Link to="/code" className="menu-link">Start Code</Link>
          <Link to="#" className="menu-link">Contact</Link>
        </div>

        {/* Register and Sign In Buttons */}
        <div className="auth-buttons">
         
          <Link to="/Signup" className="auth-button register-btn">Register</Link>
          
          
          
          <Link to="/Signup" className="auth-button signin-btn">Sign In</Link>
          
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
