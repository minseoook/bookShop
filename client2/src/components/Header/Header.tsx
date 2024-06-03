import SearchBar from "../SearchBar/SearchBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import styled from "./header.module.css";

const Header = () => {
  return (
    <div className={styled.container}>
      <div className={styled.logo}>
        <img src="https://img.icons8.com/cute-clipart/64/book.png" alt="book" />
      </div>
      <div className={styled.search}>
        <SearchBar />
      </div>
      <div className={styled.buttons}>
        <button className={styled.login}>로그인</button>
        <button className={styled.register}>회원가입</button>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
