import React from "react";
import "./FooterSection.css"; // Import the CSS file
import logo from "../proj_img/logo.png"; // Assuming the logo is in this path
import { FaInstagram , FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Website Name */}
        <div className="footer-logo-section">
          <img src={logo} alt="Code Matrix Logo" className="footer-logo" />
          <h3 className="footer-title">Code <span className="mat">Matrix</span></h3>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:info@codematrix.com">info@codematrix.com</a></p>
          <p>Phone: +91 23456 47890</p>
          <div className="social-icons">
            <FaInstagram/>
            <FaFacebookSquare/>
            <FaLinkedin/>
            <FaSquareTwitter/>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 Code Matrix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
