import { Link } from "react-router-dom";
import styled from "./error.module.css";

const Error = () => {
  return (
    <div className={styled.container}>
      <div className={styled.error}>Error 404: 찾을수 없는 페이지 입니다</div>
      <Link to="/" className={styled.back}>
        이전으로
      </Link>
    </div>
  );
};

export default Error;
