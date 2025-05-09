import React, { useState, useEffect } from 'react';
import "./ProfilePage.css";
import ProfileDetails from './ProfileDetails';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    projects: ['Project 1', 'Project 2', 'Project 3'],
  });

  // Mock fetch for user data
  useEffect(() => {
    // Fetch user data here
    // For now, it's hardcoded above
  }, []);

  return (
    <>
    <div style={{maxWidth: "min-content"}}>
     <ProfileDetails/>
     </div>
    <div className="profile-container">

      <div className="card-container">
        <div className="info-card">
          <h4 className="info-title">Your Information</h4>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>

        <div className="projects-card">
          <h4 className="projects-title">Your Projects</h4>
          <ul>
            {userData.projects.map((project, index) => (
              <li key={index} className="project-item">{project}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-container">
        <div className="files-card">
          <h4 className="files-title">Your Files</h4>
          <ul>
            <li className="file-item">file1.pdf</li>
            <li className="file-item">file2.docx</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
