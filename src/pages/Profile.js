import React from 'react';
import Navbar from '../components/Navbar';

import FooterSection from '../components/FooterSection';
import ProfilePage from '../components/ProfilePage';

const Profile = () => {
  return (
    <div>
      <Navbar />
     <ProfilePage/>
      <FooterSection/>
    </div>
  );
};

export default Profile;