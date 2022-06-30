import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Search.scss";
import UseHelmet from "../../layout/UseHelmet";

function Search() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <UseHelmet title="Search --Apni Dukaan" />
      <form className="searchBox" onSubmit={handleSubmit}>
        <input
          className="input-1"
          type="text"
          placeholder="Explore Products"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type="submit" value="search" className="input-2" />
      </form>
    </>
  );
}

export default Search;
