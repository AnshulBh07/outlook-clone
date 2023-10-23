import React from "react";
import "../styles/emailBodyStyles.css";
import { useEffect } from "react";
import { getEmailBody } from "../services/EmailBody";
import { formatTimestampDate } from "../services/formatDate";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, removeFromFav } from "../actions/favouriteActions";

function EmailBody({ bodyVars }) {
  const dispatch = useDispatch();
  const bodyref = useRef();

  const favMails = useSelector((store) => store.main.favs);

  // useEffecthook to fetch mail body
  useEffect(() => {
    const fetchMailBody = async () => {
      const data = await getEmailBody(bodyVars.id);
      //after the email body has been extracted which is in the form of an html string we can set it
      //to parent wrapper div using useref
      bodyref.current.innerHTML = data;
    };
    fetchMailBody();
  }, [bodyVars]);

  function handleAddFavourite() {
    dispatch(addToFav(bodyVars.id));
  }

  function handleRemoveFavourite() {
    dispatch(removeFromFav(bodyVars.id));
  }

  return (
    <div className="container__body">
      <div className="avatar-body">
        <p>{bodyVars.name.slice(0, 1)}</p>
      </div>
      <div className="info-body">
        <div className="sub-favbtn">
          <h2>{bodyVars.subject}</h2>
          {favMails.find((x) => {
            return x === bodyVars.id;
          }) ? (
            <button onClick={handleRemoveFavourite}>
              remove from favourite
            </button>
          ) : (
            <button onClick={handleAddFavourite}>mark as favourite</button>
          )}
        </div>

        <h4 className="body-date">{formatTimestampDate(bodyVars.date)}</h4>

        <div className="body-text" ref={bodyref}></div>
      </div>
    </div>
  );
}

export default EmailBody;
