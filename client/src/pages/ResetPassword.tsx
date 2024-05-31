import { useForm } from "react-hook-form";
import Title from "../components/common/Title";
import { SignupStyle } from "./Signup";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { useState } from "react";
import { userResetPassword, userResetRequest } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";

export interface SignupProps {
  email: string;
  password: string;
}

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [resetRequested, setResetRequested] = useState(false);

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
      userResetPassword(data).then(() => {
        showAlert("비밀번호 초기화 완료");
        navigate("/login");
      });
    } else {
      userResetRequest(data).then(() => {
        setResetRequested(true);
      });
    }
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요</p>
            )}
          </fieldset>

          {resetRequested && (
            <fieldset>
              <InputText
                placeholder="비밀번호"
                inputType="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력해주세요</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
        </form>
      </SignupStyle>
    </>
  );
}
