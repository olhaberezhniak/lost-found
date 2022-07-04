import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import "./profile/editProfile.css";
import { editProfile, resetStatus } from "../redux/actions/authActions";
import { useNavigate, useLocation } from "react-router-dom";
import { resetErrorMessage } from "../redux/actions/authActions";
import Navbar from "../components/Appbar/Navbar";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const EditProfile = () => {

    const faculties = [
        {
            value: "Faculty of Computer Science and Cybernetics",
            label: "Faculty of Computer Science and Cybernetics",
        },
        {
            value: "Faculty of Radio Physics",
            label: "Faculty of Radio Physics",
        },
        {
            value: "Faculty of Physics",
            label: "Faculty of Physics",
        },
        {
            value: "Faculty of Sociology",
            label: "Faculty of Sociology",
        },
        {
            value: "Faculty of Chemistry",
            label: "Faculty of Chemistry",
        },
        {
            value: "Faculty of Information Technology",
            label: "Faculty of Information Technology",
        },
        {
            value: "Faculty of Mechanics and Mathematics",
            label: "Faculty of Mechanics and Mathematics",
        },
        {
            value: "Faculty of Economics",
            label: "Faculty of Economics",
        },
    ];

  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state.Data;
  const dispatch = useDispatch();

  let Name, Phone, Profile_Picture, Faculty, Group;

  if (profileData) {
    Name = profileData.name;
    Faculty = profileData.faculty;
    Group = profileData.group;
    Phone = profileData.phone;
    Profile_Picture = profileData.profile_Picture;
  }
  console.log("Group", Group)

  const Status8 = useSelector((state) => state.auth.editProfileResponse);
  const data = useSelector((state) => state.auth.editProfileData);

  const errorMessage2 = useSelector((state) => state.auth.errorMessage);
  let NewToken;
  if (data) {
    NewToken = data.user_token;
  }

  if (Status8 === 200) {
    localStorage.setItem("jwt", NewToken);
    dispatch(resetStatus);
    dispatch(resetErrorMessage);
    navigate("/sidebar");
  }

  const [name, setName] = useState(Name);
  const [phone, setPhone] = useState(Phone);
  const [profile_Picture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState(Faculty);
  const [group, setGroup] = useState(Group);

  useEffect(() => {
    setLoading(false);
  }, [errorMessage2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("profile_picture", profile_Picture);
    formData.append('faculty', faculty);
    formData.append('group', group);

    dispatch(editProfile(formData));
  };

  return (
    <>
      <Navbar />
      <div className="signUpContainer">
        <div className="signUpFormCont">
          <h1
            style={{
              width: "100%",
              color: "#332A7C",
              fontFamily: "Inconsolata, monospace",
            }}
          >
            EDIT PROFILE
          </h1>

          <input
            style={{ fontFamily: "Inter, monospace", fontWeight: "500" }}
            defaultValue={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
          />

          <input
            style={{ fontFamily: "Inter, monospace", fontWeight: "500" }}
            defaultValue={Phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder="Mobile No"
          />

            <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                helperText="Please select the category"
            >
                {faculties.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <input
                defaultValue={Group}
                style={{ fontFamily: "Inter, monospace", fontWeight: "500" }}
                onChange={e => setGroup(e.target.value)} type="text" placeholder="Group"
            /> <br/>
          <input
            style={{ border: "none" }}
            onChange={(e) => setProfilePicture(e.target.files[0])}
            type="file"
          />
          <LoadingButton
            style={{
              width: "24rem",
              height: "2.5rem",
              fontSize: "1.4rem",
              background: "#F25767",
              color: "white",
              border: "none",
              fontFamily: "Inter, monospace",
              fontWeight: "700",
              borderRadius: "6px",
            }}
            className="submit button"
            onClick={handleSubmit}
            endIcon={<ArrowForwardIosIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Submit
          </LoadingButton>
          <p style={{ color: "black" }}>{errorMessage2}</p>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
