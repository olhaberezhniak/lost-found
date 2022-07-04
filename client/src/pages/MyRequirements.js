import jwt_decode from "jwt-decode";
import "../components/Requirement/requirement.css";
import ReqFeed from "../components/Requirement/ReqFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllOwnRequirements } from "../redux/actions/RequirementActions";
import LoadingBox from "../components/LoadingBox";
import { useState, useEffect } from "react";
import { deleteRequirement } from "../redux/actions/RequirementActions";

const MyRequirements = () => {
  const itemList = useSelector((state) => state.requirement.ownItems);

  const isLoading = useSelector((state) => state.requirement.isLoading);

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  useEffect(async () => {
    await dispatch(getAllOwnRequirements());
    setItems(itemList);
  }, []);

  //delete-item
  const handleClick = (data, e) => {
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);
    dispatch(deleteRequirement(data._id, decoded.auth_token));
    const newitems = items.filter((item) => item._id != data._id);
    setItems(newitems);
  };

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <div className="requirement_page">
          <div className="page_content">
            {items.length > 0 ? (
              items.map((item, index) => {
                return (
                  <ReqFeed
                    key={index}
                    editOption={true}
                    postedBy={"You"}
                    handleClick={handleClick}
                    data={item}
                  />
                );
              })
            ) : (
              <div>No Requirements as of now</div>
            )}
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default MyRequirements;
