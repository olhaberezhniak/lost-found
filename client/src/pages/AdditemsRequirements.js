import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../components/BuySell/AddItems.css";
import {
  addRequirements,
  resetStatus,
} from "../redux/actions/RequirementActions";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LoadingButton from "@mui/lab/LoadingButton";

function Modal({ toggleModal, modal }) {
  const navigate = useNavigate();
  const errorMessage = useSelector(
    (state) => state.requirement.errorMessageRequirements
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const status = useSelector(
    (state) => state.requirement.addrequirementresponse
  );

  if (status === 200) {
    dispatch(resetStatus);
    window.location.reload(true);
  }

  useEffect(() => {
    setLoading(false);
  }, [errorMessage]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

    dispatch(addRequirements(title, description, decoded.auth_token));
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2
              style={{
                color: "#332A7C",
                fontFamily: "Inconsolata,sans-serif",
                fontweight: "700",
              }}
            >
              Add Requirement
            </h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontweight: "900",
                  marginTop: "15px",
                }}
                htmlFor="input"
              >
                Title
              </label>
              <input onChange={(e) => setTitle(e.target.value)} type="text" />

              <label
                style={{ fontFamily: "Inter,sans-serif", fontweight: "900" }}
                htmlFor="input"
              >
                Description
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
              />

              <LoadingButton
                style={{
                  width: "13rem",
                  color: "white",
                  fontFamily: "Inter, monospace",
                  background: "#332A7C",
                  borderRadius: "10px",
                  margin: "20px",
                  height: "2.5rem",
                  fontWeight: "700",
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
              <p>{errorMessage}</p>
            </form>

            <button className="close-modal" onClick={toggleModal}>
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
