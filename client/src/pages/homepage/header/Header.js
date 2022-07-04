import React from "react";
import homeimg from "../../../assests/home3.png";

import "./header.css";

const Header = () => (
  <div className="header3 section__padding" id="home">
    <div className="header-image3">
      <img src={homeimg} />
    </div>
    <div className="header-content3">
      <h1>Hey, do you lost something?</h1>
      <p>
        I know it's difficult to find even your glasses every morning. Isn't it?
      </p>
      <p>
        Don't worry, you are at right place where you can report if you have
        lost something or if you want to buy/sell something.
      </p>
      <div className="header-content_input3">
        <a href="client/src/pages/homepage/header/Header#feature">
          <p>Know More</p>
        </a>
      </div>
    </div>
  </div>
);

export default Header;
