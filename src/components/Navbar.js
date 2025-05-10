import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';  
import logo from "../proj_img/logo.png"; 
import { DataContext } from '../DataContext';
import axios from 'axios'; // Import axios for making HTTP requests

const Navbar = () => {
   const navigate = useNavigate(); // Use useNavigate for navigation
  const { islogin } = useContext(DataContext);
  const { setIslogin } = useContext(DataContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   // State to track if user is logged in
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      // Make logout API call
      await axios.post('https://college-project-backend-rtiw.onrender.com/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      // Clear local storage and state
      localStorage.removeItem('token');
      setIslogin(false);
      setIsDropdownOpen(false);
  
      // Full page reload after everything is done
      // window.location.reload();
      navigate('/Signup');
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          <a href="/#features" className="menu-link">Features</a>
        </div>

        {/* Conditional Rendering for Auth Buttons or User Profile */}
        <div className="auth-section">
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
    </nav>
  );
};

export default Navbar;
