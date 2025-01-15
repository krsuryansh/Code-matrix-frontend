import React from 'react';
// import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import SignUp from "./pages/SignUp";
// import Contact from "./pages/Contact";
import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code" element={<Editor />} />
        <Route path="/Signup" element={<SignUp />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
};

export default App;