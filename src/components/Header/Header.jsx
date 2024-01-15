import React, { useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import useAuthCheck from '../../hooks/useAuthCheck';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  // console.log({ user });

  const getMenuStyle = (menuOpen) => {
    if (document.documentElement.clientWidth <= 800) {
      return {
        right: !menuOpen && '-100%',
      };
    }
  };

  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
      setMenuOpen(false);
    }
  };

  return (
    <section className="h-wrapper ">
      <div className=" flexCenter paddings innerWidth h-container">
        <Link to={'/'}>
          <img src="./logo.png" width={100} loading="lazy" alt="logo" />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpen(false)}>
          <div
            className={`flexCenter h-menu ${menuOpen ? 'block' : 'hide'}`}
            style={getMenuStyle(menuOpen)}
          >
            <NavLink to={'/properties'} onClick={() => setMenuOpen(false)}>
              Properties
            </NavLink>

            <a
              href="mailto:nwamkwoernest2020@gmail.com"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

            {/* add property */}

            <div onClick={handleAddPropertyClick} style={{ cursor: 'pointer' }}>
              Add property
            </div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
            {/* login  */}

            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu
                user={user}
                logout={logout}
                setMenuOpen={setMenuOpen}
              />
            )}
          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
