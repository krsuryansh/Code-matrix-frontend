import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';  
import logo from "../proj_img/logo.png"; 
import { DataContext } from '../DataContext';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { islogin, setIslogin } = useContext(DataContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://college-project-backend-rtiw.onrender.com/user/logout',
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      localStorage.removeItem('token');
      setIslogin(false);
      setIsDropdownOpen(false);
      navigate('/Signup');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Hamburger - only on mobile */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        {/* Logo - stays always */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} className="proj-logo" alt="Project Logo" />
          </Link>
          {/* Hide text on mobile */}
          <Link to="/" className="logo-link desktop-only">
            <div className="logo">Code <span className='mat'>Matrix</span></div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="menu-items desktop-only">
          <Link to="/" className="menu-link">Home</Link>
          <Link to="/code" className="menu-link">Start Code</Link>
          <a href="/#features" className="menu-link">Features</a>
        </div>

        {/* Auth Section (desktop) */}
        <div className="auth-section desktop-only">
          {islogin ? (
            <div className="user-profile-button">
              <button className="user-button" onClick={toggleDropdown}>User</button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/Profile" className="dropdown-item">Profile</Link>
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

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="mobile-sidebar">
          <button className="close-btn" onClick={closeMenu}>×</button>
          <div className="sidebar-content">
            <Link to="/" className="menu-link" onClick={closeMenu}>Home</Link>
            <Link to="/code" className="menu-link" onClick={closeMenu}>Start Code</Link>
            <a href="/#features" className="menu-link" onClick={closeMenu}>Features</a>

            {islogin ? (
              <div className="sidebar-dropdown">
                <button className="menu-link" onClick={toggleDropdown}>User ▾</button>
                {isDropdownOpen && (
                  <div className="sidebar-dropdown-menu">
                    <Link to="/Profile" className="dropdown-item" onClick={closeMenu}>Profile</Link>
                    <Link to="/projects" className="dropdown-item" onClick={closeMenu}>Projects</Link>
                    <Link to="/settings" className="dropdown-item" onClick={closeMenu}>Settings</Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons-mobile">
                <Link to="/Signup" className="auth-button register-btn" onClick={closeMenu}>Register</Link>
                <Link to="/Signup" className="auth-button signin-btn" onClick={closeMenu}>Sign In</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
