import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './nav_bar.css';

import { Link } from 'react-router-dom';

const Nav_bar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="navbar3">
      <div className="navbar-links3">
        <div className="navbar-links_logo3">
          <p id='abcd'>Lost and Found</p>
        </div>
        <div className="navbar-links_container3">
          <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#feature">Features</a></p>
          <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#motive">Motive</a></p>
          <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#testimonial">Reviews</a></p>
          <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#footer">Contact Us</a></p>
        </div>
      </div>
      <div className="navbar-sign3">
        <button type="button" name='login'><Link to='loginSignUp'>LogIn/SignUp</Link></button>
      </div>
      <div className="navbar-menu3">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="navbar-menu_container3 scale-up-center">
          <div className="navbar-menu_container-links3">
            <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#feature">Features</a></p>
            <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#motive">Motive</a></p>
            <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#review">Reviews</a></p>
            <p><a href="client/src/pages/homepage/nav_bar/Nav_bar#blog">Contact Us</a></p>
          </div>
          <div className="navbar_menu_container_sign3">
            <p><Link to='loginSignUp'>LogIn/SignUp</Link></p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Nav_bar;
