import { useState } from "react";
import styled from "./searchBar.module.css";
import { useNavigate } from "react-router-dom";
import { getSearchTerms, saveSearch } from "../../utils/SaveSearch";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchs = getSearchTerms();
  const navigate = useNavigate();
  const onsubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    saveSearch(search);
    navigate(`/books?q=${search}`);
    setSearch("");
    setIsModalOpen(false);
  };

  const searchClick = (search: string) => {
    navigate(`/books?q=${search}`);
  };
  return (
    <>
      <form
        className={styled.container}
        onSubmit={onsubmit}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
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
      {isModalOpen && (
        <div className={styled.searchContainer}>
          {searchs.map((search) => (
            <div
              className={styled.searchTab}
              onClick={() => searchClick(search)}
            >
              <h5>{search}</h5>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
