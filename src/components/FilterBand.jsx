import React from "react";
import "../styles/filterBandStyles.css";

function FilterBand({ setFilter }) {
  function handleFilterClick(e) {
    setFilter(e.target.innerText);
  }

  return (
    <section className="section__filter-band">
      <div className="filters">
        <h3 className="filter-title">filter by:</h3>
        <div className="container__filter-btns">
          <button className="btn-filter" onClick={handleFilterClick}>
            unread
          </button>
          <button className="btn-filter" onClick={handleFilterClick}>
            read
          </button>
          <button className="btn-filter" onClick={handleFilterClick}>
            favourites
          </button>
          <button className="btn-filter" onClick={handleFilterClick}>
            all
          </button>
        </div>
      </div>
    </section>
  );
}

export default FilterBand;
