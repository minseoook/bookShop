import { useEffect, useState } from "react";
import styled from "./register.module.css";
import { checkEmail, register } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setemailCheck] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0) {
      const delay = setTimeout(async () => {
        try {
          await checkEmail({ email });
          setemailCheck("사용가능한 이메일입니다");
        } catch (err) {
          setemailCheck("이메일이 중복입니다");
        }
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [email]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      await register({ email, password });
      navigate("/login");
    } catch (err) {
      alert("회원가입에 실패했습니다");
    }
  };
  return (
    <div className={styled.container}>
      <h1>회원가입</h1>
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
        {emailCheck && <p className={styled.error}>{emailCheck}</p>}
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
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
