import React from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import FooterSection from '../components/FooterSection';
// import ProfilePage from '../components/ProfilePage';

const ChatApp = () => {
  return (
    <div>
      <Navbar />
     <Chat/>
      <FooterSection/>
    </div>
  );
};

export default ChatApp;