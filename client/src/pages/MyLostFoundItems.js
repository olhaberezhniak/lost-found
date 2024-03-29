import "../components/LostFound/LostFound.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import LostFoundCard from "../components/LostFound/LostFoundCard";
import jwt_decode from "jwt-decode";

import {
  deleteLostFoundItem,
  getAllOwnLostFoundItems,
} from "../redux/actions/LostFoundActions";

const MyLostFoundItems = () => {
  useEffect(() => {
    dispatch(getAllOwnLostFoundItems());
  }, []);

  const items = useSelector((state) => state.lostFound.ownlostfoundItems);
  const isLoading = useSelector((state) => state.lostFound.isLoading);

  const dispatch = useDispatch();

  const handleClick = (card, e) => {
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);
    dispatch(deleteLostFoundItem(card._id, decoded.auth_token));
  };

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <div className="Bcards-cont">
          {items.length > 0 ? (
            items.map((card, index) => {
              return (
                <LostFoundCard
                  handleClick={handleClick}
                  postedby={"You"}
                  editOption={true}
                  key={index}
                  card={card}
                />
              );
            })
          ) : (
            <div>No Requirements as of now</div>
          )}
        </div>
      )}
    </>
  );
};

export default MyLostFoundItems;
