import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/LoginSignUp/SignUpForm.css";
import { addUserDetails } from "../redux/actions/authActions";
import { useNavigate, useLocation } from "react-router-dom";
import { resetErrorMessage } from "../redux/actions/authActions";
import Navbar from "../components/Appbar/Navbar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const SignUpForm = () => {

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

  const addUserResponse = useSelector((state) => state.auth.addUserResponse);
  const location = useLocation();
  let Email;
  let Name;
  let Profile_picture;
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  let signUpErrorMessage;

  if (location.state != null) {
    if (location.state.Email) {
      Email = location.state.Email;
    }
    if (location.state.name && location.state.profile_picture) {
      Name = location.state.name;
      Profile_picture = location.state.profile_picture;
    }
  }

  const navigate = useNavigate();
  const [name, setName] = useState(Name);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile_Picture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [terms_accepted, setTerms_accepted] = useState(false);
  const [faculty,setFaculty] = useState('');
  const [group,setGroup] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [signUpErrorMessage]);

  const dispatch = useDispatch();

  //signUp verified here
  if (addUserResponse.data) {
    if (addUserResponse.data.user_token) {
      dispatch(resetErrorMessage);
      localStorage.setItem("jwt", addUserResponse.data.user_token);
      navigate("/dashboard");
    }
  } else {
    signUpErrorMessage = errorMessage;
  }

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", Email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);
    formData.append("terms_accepted", terms_accepted);
    formData.append("faculty", faculty);
    formData.append("group", group);

    formData.append("profile_Picture", profile_Picture);

    dispatch(addUserDetails(formData));
  };

  const handleChange = (event) => {
    setFaculty(event.target.value);
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
              fontSize: "30px",
            }}
          >
            ENTER YOUR DETAILS
          </h1>
          <input
            style={{
              marginTop: "20px",
              width: "40%",
              height: "7%",
              margin: "10px",
              padding: "7px",
            }}
            defaultValue={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
          />
          <input
            style={{
              marginTop: "20px",
              width: "40%",
              height: "7%",
              margin: "10px",
              padding: "7px",
            }}
            defaultValue={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Email"
            type="text"
          />
          <input
              style={{
                width: "40%",
                height: "7%",
                margin: "10px",
                padding: "7px",
              }}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder="Mobile No"
          />
          <TextField
              style={{
                width: "40%",
                height: "7%",
                margin: "10px",
                padding: "7px",
              }}
              id="outlined-select-currency"
              select
              label="Select"
              value={faculty}
              onChange={handleChange}
              helperText="Please select the category"
          >
            {faculties.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
            ))}
          </TextField>

          <input
              style={{
                width: "40%",
                height: "7%",
                margin: "10px",
                padding: "7px",
              }}
              onChange={e => setGroup(e.target.value)}
              type="text"
              placeholder="Group"
          />
          <input
              style={{
                width: "40%",
                height: "7%",
                margin: "10px",
                padding: "7px",
              }}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <input
              style={{
                width: "40%",
                height: "7%",
                margin: "10px",
                padding: "7px",
          }}
            onChange={(e) => setConfirm_Password(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          /> <br/>
            <div>
          <label
            style={{
              marginTop: "8px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "700",
              color: "black",
            }}
            htmlFor="input"
          >
            Terms and condition
          </label>
          <input
            style={{ width: "4rem", height: "1rem" }}
            type="checkbox"
            onChange={(e) => setTerms_accepted(e.target.checked)}
            defaultChecked={terms_accepted}
          />
            </div>
          {/* <button style={{width:'24rem',height:'2.5rem',fontSize:'1.4rem',background:"#F25767",color:'white',border:'none',fontFamily:"Inter, monospace",fontWeight:'700',
            borderRadius:'6px'}} onClick={handleSubmit}>SUBMIT</button> */}
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
          <p style={{ color: "black" }}>{signUpErrorMessage}</p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
