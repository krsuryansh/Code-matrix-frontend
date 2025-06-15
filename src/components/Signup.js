import React, { useRef, useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { DataContext } from '../DataContext';

function Signup() {
  const { setIslogin } = useContext(DataContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.fullname || !formData.email || !formData.password) {
      setErrors("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post('https://college-project-backend-rtiw.onrender.com/user/send-otp', {
        email: formData.email,
      });
  //  const response = await axios.post('http://localhost:3000/user/send-otp', {
  //       email: formData.email,
  //     });

      if (response.data.success) {
        setSuccessMessage("OTP sent to your email.");
        setShowOtpModal(true);
      }
    } catch (error) {
      setErrors(error.response?.data?.message || error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors("Enter OTP sent to your email.");
      return;
    }

    try {
      const response = await axios.post('https://college-project-backend-rtiw.onrender.com/user/register', {
        ...formData,
        otp,
      });

      //  const response = await axios.post('http://localhost:3000/user/register', {
      //   ...formData,
      //   otp,
      // });


      setSuccessMessage(response.data.message);
      setIslogin(response.data.success);

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        navigate('/code');
      }

      setFormData({ username: '', fullname: '', email: '', password: '' });
      setShowOtpModal(false);
      setOtp('');
    } catch (error) {
      setErrors(error.response?.data?.message || error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setErrors('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('https://college-project-backend-rtiw.onrender.com/user/login', loginData);
      setSuccessMessage(response.data.message);
      setLoginData({ email: '', password: '' });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        setIslogin(response.data.success);
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
        <div className="signup-form-container signup-sign-up-container">
          <form onSubmit={handleSendOtp}>
            <h1>Create Account</h1>
            <div className="signup-social-container">
              {/* Social links if needed */}
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
              name="fullname"
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
            <button type="submit" className="signup-button">Register</button>
          </form>
        </div>

        <div className="signup-form-container signup-sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="signup-social-container">
              {/* Social links if needed */}
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
              {successMessage && <div className="message success">{successMessage}</div>}
              {errors && <div className="message error">{errors}</div>}
            </div>

            <div className="signup-overlay-panel signup-overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="signup-button ghost" onClick={handleSignUp}>Sign Up</button>
              {successMessage && <div className="message success">{successMessage}</div>}
              {errors && <div className="message error">{errors}</div>}
            </div>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <div className="otp-modal">
          <div className="otp-content">
            <h3>Enter OTP sent to your email</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
            />
            <button onClick={handleOtpSubmit} className="signup-button">Verify & Register</button>
            <button onClick={() => setShowOtpModal(false)} className="signup-button ghost">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
