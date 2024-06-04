import { useState } from "react";
import styled from "./searchBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const onsubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/books?q=${search}`);
    setSearch("");
  };
  return (
    <form className={styled.container} onSubmit={onsubmit}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <img
        src="https://img.icons8.com/glassmorphism/48/search.png"
        alt="search"
      />
    </form>
  );
};

export default SearchBar;
