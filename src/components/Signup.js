import React, { useRef, useState } from 'react';
import './login.css';
import axios from 'axios';

function Signup() {
  const containerRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState('');
  
  const [formData, setFormData] = useState({
    username: '', // Add username to state
    name: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleSignUp = () => {
    containerRef.current.classList.add('right-panel-active');
    setSuccessMessage('');
    setErrors('');
  };

  const handleSignIn = () => {
    containerRef.current.classList.remove('right-panel-active');
    setSuccessMessage('');
    setErrors('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation: check if all fields are filled
    if (!formData.username || !formData.name || !formData.email || !formData.password) {
      setErrors('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/submit-form', formData);
      setSuccessMessage(response.data.message);
      setFormData({ username: '', name: '', email: '', password: '' });
    } catch (error) {
      setErrors(error.message);
      setSuccessMessage(`Error submitting form. Please try again. ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form validation: check if all fields are filled
    if (!loginData.email || !loginData.password) {
      setErrors('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      setSuccessMessage(response.data.message);
      setLoginData({ email: '', password: '' });
    } catch (error) {
      setErrors(error.message);
      setSuccessMessage(`Login failed. ${error.message}`);
    }
  };

  return (
    <>
      <div className="signup-container" ref={containerRef}>
        <div className="signup-form-container signup-sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="signup-social-container">
              <a href="#" className="signup-social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              name="username"
              placeholder="Username" // Username field added here
              value={formData.username}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="signup-input"
            />
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
        <div className="signup-form-container signup-sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="signup-social-container">
              <a href="#" className="signup-social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginInputChange}
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginInputChange}
              className="signup-input"
            />
            <a href="#">Forgot your password?</a>
            <button type="submit" className="signup-button">Sign In</button>
          </form>
        </div>
        <div className="signup-overlay-container">
          <div className="signup-overlay">
            <div className="signup-overlay-panel signup-overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="signup-button ghost" onClick={handleSignIn}>Sign In</button>
              {/* Show success or error message */}
              {successMessage && <div className="message success">{successMessage}</div>}
              {errors && <div className="message error">{errors}</div>}
            </div>
            <div className="signup-overlay-panel signup-overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="signup-button ghost" onClick={handleSignUp}>Sign Up</button>
              {/* Show success or error message */}
              {successMessage && <div className="message success">{successMessage}</div>}
              {errors && <div className="message error">{errors}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
