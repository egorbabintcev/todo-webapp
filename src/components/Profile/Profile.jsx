import React from 'react';
import './Profile.scss';

const Profile = () => {
  const dateString = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="Profile">
      <div>
        <p className="Profile-nickname">Hey, User</p>
        <p className="Profile-date">{dateString}</p>
      </div>
      <div>
        <div className="Profile-avatar" />
      </div>
    </div>
  );
};

export default Profile;
