import { useNavigate } from "react-router-dom";
import styled from "./bookempty.module.css";

const BookEmpty = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/"); // 메인페이지로 이동
  };

  return (
    <div className={styled.container}>
      <h1>책이 없습니다</h1>
      <button onClick={handleButtonClick} className={styled.button}>
        메인페이지로
      </button>
    </div>
  );
};

export default BookEmpty;
