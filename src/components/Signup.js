import React, { useRef, useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { DataContext } from '../DataContext';

function Signup() {
  const {setIslogin} = useContext(DataContext);
  const navigate = useNavigate(); // Use useNavigate for navigation
  const containerRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',  // Username field
    fullname: '',  // Fullname field
    email: '',     // Email field
    password: ''   // Password field
  });

  const [loginData, setLoginData] = useState({
    email: '',     // Email field for login
    password: ''   // Password field for login
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
    if (!formData.username || !formData.fullname || !formData.email || !formData.password) {
      setErrors('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/register', formData);
      setSuccessMessage(response.data.message);
      setIslogin(response.data.success);

      if (response.data.success) {
        // Navigate to Editor page after successful login
        navigate('/code');
      }
      setFormData({ username: '', fullname: '', email: '', password: '' });
    } catch (error) {
      setErrors(error.response?.data?.message || error.message);
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
      const response = await axios.post('http://localhost:3000/user/login', loginData);
      setSuccessMessage(response.data.message);
      setIslogin(response.data.success);
      setLoginData({ email: '', password: '' });
      if (response.data.success) {
        // Navigate to Editor page after successful login
        navigate('/code');
      }
    } catch (error) {
      setErrors(error.response?.data?.message || error.message);
      setSuccessMessage(`Login failed. ${error.message}`);
    }
  };

  return (
    <>
      <div className="signup-container" ref={containerRef}>
        {/* Sign Up Form */}
        <div className="signup-form-container signup-sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="signup-social-container">
              {/* <a href="#" className="signup-social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-linkedin-in"></i></a> */}
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="signup-input"
            />
            <input
              type="text"
              name="fullname"  // Fullname field
              placeholder="Full Name"
              value={formData.fullname}
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

        {/* Sign In Form */}
        <div className="signup-form-container signup-sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="signup-social-container">
              {/* <a href="#" className="signup-social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="signup-social"><i className="fab fa-linkedin-in"></i></a> */}
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

        {/* Overlay Panel */}
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
