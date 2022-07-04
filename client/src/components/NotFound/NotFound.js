import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Page Not Found! </h2>
        <Link to="/dashboard">Back to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
