import { useSelector } from "react-redux";
import "./App.css";
import EmailList from "./components/EmailList";
import FilterBand from "./components/FilterBand";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  // retrieve initial state and persist in local storage
  const mainState = useSelector((store) => store.main);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("main", JSON.stringify(mainState));
  }, [mainState]);

  return (
    <div className="App">
      <FilterBand setFilter={setFilter} />
      <EmailList filter={filter} />
    </div>
  );
}

export default App;
