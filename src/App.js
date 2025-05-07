import React, { useEffect, useContext } from 'react';
// import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import SignUp from "./pages/SignUp";
import Profile from './pages/Profile';
import ChatApp from './pages/ChatApp';
import { DataContext } from './DataContext';
import axios from 'axios';
// import Contact from "./pages/Contact";

import { Routes, Route } from "react-router-dom";

// this is final test
const App = () => {
  const { setIslogin } = useContext(DataContext);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // const response = await axios.get('http://localhost:3000/user/home');
          const response = await axios.post('http://localhost:3000/user/home',{}, {
            withCredentials: true,  // Ensures cookies are sent with the request
          });
          
          setIslogin(response.data.success);
          if(response){
            console.log(`User ${response}`)
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);  // Empty dependency array means this effect runs once when the component mounts
  
  return (
    <div>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code" element={<Editor />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Chat" element={<ChatApp />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
};

export default App;