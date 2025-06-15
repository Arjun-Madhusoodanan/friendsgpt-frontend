import React from 'react';
import './FriendsCouch.css';

const FriendsCouch = ({ avatars }) => {
  return (
    <div className="couch-container">
      <img
        src="/couch.png"
        alt="Central Perk Couch"
        className="couch-image"
      />
      <div className="avatar-row">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar.src}
            alt={avatar.name}
            title={avatar.name}
            className={`avatar-seat avatar-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendsCouch;
