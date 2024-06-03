import { Link, useNavigate } from "react-router-dom";
import styled from "./login.module.css";
import { useState } from "react";
import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginAction } = useAuthStore();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const res = await login({ email, password });
      console.log(res);
      loginAction(res.accessToken);
      navigate("/");
    } catch (err) {
      alert("아이디 혹은 비밀번호가 틀립니다");
    }
  };
  return (
    <div className={styled.container}>
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email" className={styled.labelEmail}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          className={styled.inputEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className={styled.labelPassword}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={styled.inputPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styled.button}>
          로그인
        </button>
        <Link to="/reset" className={styled.resetbutton}>
          비밀번호를 잊으셨나요?
        </Link>
      </form>
    </div>
  );
};

export default Login;
