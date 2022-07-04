import "../components/Dashboard/ProfileMobile.css";
import jwt_decode from "jwt-decode";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileMobile = () => {
  const token = localStorage.getItem("jwt");
  const decoded = jwt_decode(token);

  return (
    <div className="profile_mobile2">
      <div className="profile-card2">
        <div className="edit_profile_icons">
          {" "}
          <Link to="/editProfile" state={{ Data: decoded }}>
            <FaEdit />
          </Link>{" "}
        </div>
        <div className="main-content2">
          <div className="profile-img2">
            <img src={decoded.profile_picture} alt="profile_picture" />
          </div>
          <h1>{decoded.name}</h1>
          <h4>{decoded.email}</h4>
          <h4>{}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProfileMobile;
