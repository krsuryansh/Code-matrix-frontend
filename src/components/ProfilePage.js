import React, { useState, useEffect, useContext } from 'react';
import "./ProfilePage.css";
import ProfileDetails from './ProfileDetails';
import { DataContext } from '../DataContext';


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    projects: ['Project 1', 'Project 2', 'Project 3'],
  });
 const {user} = useContext(DataContext);
  // Mock fetch for user data
  useEffect(() => {
    // Fetch user data here
    // For now, it's hardcoded above
  }, []);

  return (
    <>
      <div style={{maxWidth: "min-content" , margin: "auto", paddingTop: "20px"}}>
        <ProfileDetails/>
      </div>
          {/* <div className="profile-container">

            <div className="card-container">
              <div className="info-card">
                <h4 className="info-title">Your Information</h4>
                <p><strong>Name:</strong> {user.fullname}</p>
                <p><strong>User Name:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>

              <div className="projects-card">
                <h4 className="projects-title">Your Projects</h4>
                <ul>
                  {user.codeFile?.map((file) => (
                    <li key={file?._id} className="project-item">{file?.filename}</li>
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
          </div> */}
    </>
  );
};

export default ProfilePage;
