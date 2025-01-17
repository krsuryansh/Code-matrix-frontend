import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  
import logo from "../proj_img/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(); // State to track if user is logged in
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
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

        {/* Conditional Rendering for Auth Buttons or User Profile */}
        <div className="auth-section">
          {isLoggedIn ? (
            <div className="user-profile-button">
              <button className="user-button" onClick={toggleDropdown}>User</button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/projects" className="dropdown-item">Projects</Link>
                  <Link to="/settings" className="dropdown-item">Settings</Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/Signup" className="auth-button register-btn">Register</Link>
              <Link to="/Signup" className="auth-button signin-btn">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
