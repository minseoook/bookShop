import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import styled from "./header.module.css";

const Header = () => {
  return (
    <div className={styled.wrapper}>
      <div className={styled.container}>
        <Link to="/">
          <div className={styled.logo}>
            <img
              src="https://img.icons8.com/cute-clipart/64/book.png"
              alt="book"
            />
          </div>
        </Link>

        <div className={styled.search}>
          <SearchBar />
        </div>
        <div className={styled.buttons}>
          <Link to="/login">
            <button className={styled.login}>로그인</button>
          </Link>
          <Link to="/register">
            <button className={styled.register}>회원가입</button>
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;
