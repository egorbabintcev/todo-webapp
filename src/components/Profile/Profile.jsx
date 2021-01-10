import React from 'react';
import * as cookies from 'js-cookie';
import './Profile.scss';

const Profile = () => {
  const dateString = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const { name } = cookies.getJSON('user');

  return (
    <div className="Profile">
      <div>
        <p className="Profile-nickname">Hey, {name}</p>
        <p className="Profile-date">{dateString}</p>
      </div>
      <div>
        <div className="Profile-avatar" />
      </div>
    </div>
  );
};

export default Profile;
