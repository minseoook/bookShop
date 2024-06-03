import styled from "./searchBar.module.css";

const SearchBar = () => {
  return (
    <form className={styled.container}>
      <input type="text" placeholder="검색어를 입력하세요" />
      <img
        src="https://img.icons8.com/glassmorphism/48/search.png"
        alt="search"
      />
    </form>
  );
};

export default SearchBar;
