import React from 'react';
import './ProfileDetails.css';

const ProfileDetails = () => {
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
            <h6 className="f-w-600">Hembo Tingor</h6>
            <p>Web Designer</p>
            <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
          </div>
        </div>
        <div className="info-block">
          <h6 className="section-title">Information</h6>
          <div className="info-row">
            <div className="info-item">
              <p className="info-label">Email</p>
              <h6 className="text-muted">rntng@gmail.com</h6>
            </div>
            <div className="info-item">
              <p className="info-label">Phone</p>
              <h6 className="text-muted">98979989898</h6>
            </div>
          </div>

          <h6 className="section-title">Projects</h6>
          <div className="info-row">
            <div className="info-item">
              <p className="info-label">Recent</p>
              <h6 className="text-muted">Sam Disuja</h6>
            </div>
            <div className="info-item">
              <p className="info-label">Most Viewed</p>
              <h6 className="text-muted">Dinoter husainm</h6>
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
