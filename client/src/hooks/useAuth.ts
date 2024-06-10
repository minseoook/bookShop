import { signup, userLogin } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";

export const useAuth = () => {
  const { storeLogin } = useAuthStore();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const login = (data: LoginProps) => {
    userLogin(data).then(
      (res) => {
        console.log(res.token);
        storeLogin(res.token);
        showAlert("로그인 완료");
        navigate("/");
      },
      (err) => {
        showAlert("로그인 실패했습니다");
      }
    );
  };

  const usersignUp = (data: SignupProps) => {
    signup(data)
      .then((res) => {
        showAlert("회원가입 성공");
        navigate("/login");
      })
      .catch((e) => {
        if (e instanceof Error) {
          showAlert("회원가입 실패");
        }
      });
  };
  return { login, usersignUp };
};
