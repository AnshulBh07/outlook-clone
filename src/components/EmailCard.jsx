import React from "react";
import { formatTimestampDate } from "../services/formatDate";
import "../styles/emailCardStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { addToRead } from "../actions/readActions";

function EmailCard({ item, setBodyVars }) {
  const dispatch = useDispatch();
  const readMails = useSelector((store) => store.main.read);

  function isRead(x) {
    for (var i = 0; i < readMails.length; i++) {
      if (readMails[i] === x) return true;
    }
    return false;
  }

  function handleMailClick() {
    setBodyVars({
      id: item.id,
      subject: item.subject,
      name: item.from.name,
      date: item.date,
    });

    if (isRead(item.id) === false) dispatch(addToRead(item.id));
  }

  const favMails = useSelector((store) => store.main.favs);

  return (
    // style differently if the current card is present in read
    <button
      className="container__email-card"
      onClick={handleMailClick}
      style={isRead(item.id) ? { backgroundColor: "var(--readBg)" } : {}}
    >
      <div className="avatar">
        <p>{`${item.from.name.slice(0, 1)}`}</p>
      </div>
      <div className="email-info">
        <p>
          from: <span>foo bar {`${item.from.email}`}</span>
        </p>
        <p>
          subject <span>{item.subject}</span>
        </p>
        <p>{item.short_description}</p>

        <div className="date-favtags">
          <p className="date">{formatTimestampDate(item.date)}</p>
          {favMails.find((x) => {
            return x === item.id;
          }) && <p className="favs">Favourite</p>}
        </div>
      </div>
    </button>
  );
}

export default EmailCard;
