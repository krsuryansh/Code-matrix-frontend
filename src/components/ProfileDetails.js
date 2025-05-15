import React from 'react';
import './ProfileDetails.css';
import { DataContext } from '../DataContext';
import { useContext } from 'react';

const ProfileDetails = () => {
 const {user} = useContext(DataContext);



  return (
    <div className="profile-details-container">
      <div className="user-card-full">
        <div className="user-profile">
          <div className="card-block text-center text-white">
            <div className="m-b-25">
              <img
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                className="img-radius"
                alt="User-Profile"
              />
            </div>
            <h3 className="f-w-600">{user.fullname}</h3>
            <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
          </div>
        </div>
        <div className="info-block">
          <h6 className="section-title">Information</h6>
          <div className="info-row">
            <div className="info-item">
              <p className="info-label">Email</p>
              <h6 className="text-muted">{user.email}</h6>
            </div>
            <div className="info-item">
              <p className="info-label">User Name</p>
              <h6 className="text-muted">{user.username}</h6>
            </div>
            <div className="info-item">
              <p className="info-label">userId</p>
              <h6 className="text-muted">{user._id}</h6>
            </div>
          </div>

        
          <ul className="social-link">
            <li>
              <a href="#!">
                <i className="mdi mdi-facebook feather icon-facebook facebook"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="mdi mdi-twitter feather icon-twitter twitter"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="mdi mdi-instagram feather icon-instagram instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
