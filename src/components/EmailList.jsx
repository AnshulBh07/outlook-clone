import React from "react";
import { useEffect } from "react";
import { getEmailList } from "../services/EmailList";
import EmailCard from "./EmailCard";
import "../styles/emailListStyles.css";
import { useState } from "react";
import EmailBody from "./EmailBody";
import { FaGreaterThan } from "react-icons/fa";
import { usePagination } from "../custom-hooks/pagination";
import { useSelector } from "react-redux";

function EmailList({ filter }) {
  const [mailData, setMailData] = useState([]);
  const [bodyVars, setBodyVars] = useState({
    id: null,
    subject: "",
    initials: "",
    date: null,
  });
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const fetchAllEmails = async () => {
      const data = await getEmailList();
      setMailData(data);
    };

    fetchAllEmails();
  }, []);

  const readMails = useSelector((store) => store.main.read);
  const favMails = useSelector((store) => store.main.favs);

  //logic to filter data based on filter selected
  function isPresent(val, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (val === arr[i]) return true;
    }
    return false;
  }

  var filteredData = [];
  if (filter === "Read") {
    for (var i = 0; i < mailData.length; i++) {
      if (isPresent(mailData[i].id, readMails)) filteredData.push(mailData[i]);
    }
  } else if (filter === "All") {
    filteredData = mailData;
  } else if (filter === "Favourites") {
    for (var i = 0; i < mailData.length; i++) {
      if (isPresent(mailData[i].id, favMails)) filteredData.push(mailData[i]);
    }
  } else if (filter === "Unread") {
    for (var i = 0; i < mailData.length; i++) {
      if (!isPresent(mailData[i].id, readMails)) filteredData.push(mailData[i]);
    }
  }

  const range = usePagination({
    totalCount: filteredData.length,
    pageSize: 5,
    currentPage: currPage,
  });

  const totalPages = Math.ceil(filteredData.length / 5);

  // slice this data as per page
  const data = filteredData.slice((currPage - 1) * 5, currPage * 5);

  return (
    <section className="section__emails">
      <div className="emails-list" style={bodyVars.id && { width: "40%" }}>
        <div className="mails-container">
          {data.map((item, index) => {
            return (
              <EmailCard item={item} key={index} setBodyVars={setBodyVars} />
            );
          })}
        </div>
        <div className="pagination-bar">
          <button
            className="next-page-btn"
            onClick={() => {
              setCurrPage(currPage - 1);
              window.scrollTo(0, 300);
            }}
            disabled={currPage === 1}
          >
            <FaGreaterThan className="prev-icon" />
          </button>
          {range.map((item, index) => {
            return (
              <button
                className={`pagination-btn ${item === "..." ? "dots" : ""} ${
                  index + 1 === currPage ? "btn-active" : ""
                }`}
                key={index}
                onClick={(e) => {
                  setCurrPage(item);
                }}
              >
                {item}
              </button>
            );
          })}
          <button
            className="next-page-btn"
            onClick={() => {
              setCurrPage(currPage + 1);
              window.scrollTo(0, 300);
            }}
            disabled={currPage === totalPages}
          >
            <FaGreaterThan className="next-icon" />
          </button>
        </div>
      </div>
      {/* only show body if a mail is clicked */}
      {bodyVars.id && (
        <div className="email-body" style={bodyVars.id && { width: "60%" }}>
          <EmailBody bodyVars={bodyVars} />
        </div>
      )}
    </section>
  );
}

export default EmailList;
