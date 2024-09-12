import google from "@/assets/imgs/google.png";
import kakao from "@/assets/imgs/kakao.png";
import SquareButton from "@/components/buttons/SquareButton";
import InputField from "@/components/inputField/InputField";
import Tooltip from "@/components/tooltip/Tooltip";
import Title from "@/components/user/Title";
import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";
import useAuth from "@/hooks/useAuth";
import { ILogin } from "@/models/auth.model";
import { getLocalStorage } from "@/utils/localStorage";
import qs from "qs";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { UserStyle } from "./UserStyle";

const isDevMode = import.meta.env.DEV;
const BASE_URL = isDevMode ? "http://localhost:5173" : "https://pogakco.site";

const GOOGLE_OAUTH_REDIRECT_URI = `${BASE_URL}/oauth/google`;
const KAKAO_OAUTH_REDIRECT_URI = `${BASE_URL}/oauth/kakao`;

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

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: KAKAO_OAUTH_REDIRECT_URI
    });
  };

  const handleGoogleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth`;
    const query = qs.stringify({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_OAUTH_REDIRECT_URI,
      response_type: "code",
      scope: "email"
    });

    window.location.href = `${url}?${query}`;
  };

  return (
    <UserStyle>
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
      <Seperator>또는</Seperator>
      <SocialButtons>
        <button onClick={handleKakaoLogin} type="button" className="KAKAO">
          <img src={kakao} />
          {getLocalStorage("provider") === "KAKAO" && (
            <Tooltip>최근 로그인한 계정</Tooltip>
          )}
        </button>
        <button onClick={handleGoogleLogin} type="button" className="GOOGLE">
          <img src={google} />
          {getLocalStorage("provider") === "GOOGLE" && (
            <Tooltip>최근 로그인한 계정</Tooltip>
          )}
        </button>
      </SocialButtons>
      <div className="login-check">
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </div>
    </UserStyle>
  );
};

const Seperator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  margin: 32px 0 16px 0;

  &::before,
  &::after {
    content: "";
    width: 50%;
    height: 1px;
    background-color: #d0d0d0;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;

  img,
  button {
    width: 48px;
    height: 48px;
    position: relative;
  }
`;
export default UserLogin;
