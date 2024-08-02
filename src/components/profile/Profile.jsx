import React from 'react';
import './profile.css'; // Ensure this CSS file has the updated styles
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession'

const UserProfile = () => {
  const {lab_name, lab_id, access_token} = CheckSession()
  // get lab details from local storage
  // const lab_id = localStorage.getItem("lab_id")
  const permit = localStorage.getItem("permit_id")
  const email = localStorage.getItem("email")
  const reg_date = localStorage.getItem("reg_date")
  const labname = localStorage.getItem("lab_name")



  return (
    <div className="profile-container">
      <Layout />
      <div className="profile-header-container">
        <h1 className="profile-header">User Profile</h1>
      </div>
      <div className="profile-card">
        <div className="profile-avatar">
          {/* Placeholder for user avatar */}
          <img src="/images/avatar.jpeg" alt="User Avatar" className="avatar-image" />
        </div>
        <h2 className='title'>{lab_name}</h2>
        <div className="profile-details">
          <div className="profile-item">
            <span className="profile-label">ID:</span>
            <span className="profile-value">{lab_id}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Permit:</span>
            <span className="profile-value">{permit}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{email}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Registration Date:</span>
            <span className="profile-value">{reg_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
