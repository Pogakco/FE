import InputField from "@/components/inputField/InputField";
import styled from "styled-components";
import Title from "@/components/user/Title";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "@/models/auth.model";
import useAuth from "@/hooks/useAuth";
import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>();

  const { userLogin, isError } = useAuth();

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    userLogin(data);
  };

  return (
    <UserLoginStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.email}
            schema="auth"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className="help-message">{AUTH_INPUT_FIELD_ERROR.email}</div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.password}
            schema="auth"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="help-message">
              {AUTH_INPUT_FIELD_ERROR.password}
            </div>
          )}
        </fieldset>
        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          로그인
        </SquareButton>
      </form>
      {isError && (
        <div className="help-message">이메일 또는 비밀번호가 틀렸습니다.</div>
      )}
      <div className="login-check">
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </div>
    </UserLoginStyle>
  );
};

export const UserLoginStyle = styled.main`
  position: absolute;
  inset: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${({ theme }) => theme.layoutWidth.auth};
  height: fit-content;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    width: 100%;

    fieldset {
      position: relative;
      button {
        position: absolute;
        top: 8px;
        right: -122px;
      }
    }
  }

  .help-message {
    margin: 8px 9px 0px 9px;
    font-size: ${({ theme }) => theme.fontSize.small};
    color: #ff0000;
  }

  .login-check {
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.color.grey3};
    text-align: center;
    margin: 29px 0 0 0;
    a {
      color: ${({ theme }) => theme.color.black};
    }
  }
`;
export default UserLogin;
