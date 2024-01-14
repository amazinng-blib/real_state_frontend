import React, { useContext, useState } from 'react';
import './ProfileMenu.css';
import { useNavigate } from 'react-router-dom';
import UserDetailsContext from '../../context/UserDetailsContext';

const ProfileMenu = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <p className="dropdown-button" onClick={toggleDropdown}>
        {user?.name?.slice(0, 1) + '.' + user?.family_name?.slice(0, 1)}
      </p>

      {isOpen && (
        <div className="dropdown-content">
          <p
            onClick={() => {
              navigate('../favourites', { replace: true });
              setIsOpen(false);
            }}
          >
            Favorites
          </p>
          <p
            onClick={() => {
              navigate('../bookings', { replace: true });
              setIsOpen(false);
            }}
          >
            Bookings
          </p>
          {/* <p>Profile</p> */}
          <p
            onClick={() => {
              localStorage.clear();
              logout();
            }}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
