import { UserLoginStyle } from "./UserLogin";
import Title from "@/components/user/Title";

import InputField from "@/components/inputField/InputField";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignup } from "@/models/auth.model";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { AUTH_REGEX } from "@/constants/regex";
import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";

const UserSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    formState: { errors }
  } = useForm<ISignup>();

  const { userSignup, isError } = useAuth();

  const onSubmit: SubmitHandler<ISignup> = (data) => {
    userSignup({
      nickname: data.nickname,
      email: data.email,
      password: data.password
    });
  };

  const handleDuplicate = () => {};

  // [비밀번호] value 수정 시 이미 입력된 [비밀번호 확인] value 도 같이 유효성 체크
  useEffect(() => {
    if (
      watch("password") !== watch("passwordCheck") &&
      watch("passwordCheck")
    ) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다"
      });
    } else {
      // 비밀번호 일치시 오류 제거
      clearErrors("passwordCheck");
    }
  }, [watch("password"), watch("passwordCheck")]);

  return (
    <UserLoginStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.nickname}
            schema="auth"
            {...register("nickname", {
              required: true,
              pattern: AUTH_REGEX.nickname
            })}
          />
          {errors.nickname && (
            <div className="help-message">
              {AUTH_INPUT_FIELD_ERROR.nickname}
            </div>
          )}
          <SquareButton
            buttonSize="medium"
            buttonColor="active"
            onClick={handleDuplicate}
          >
            중복확인
          </SquareButton>
        </fieldset>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.email}
            schema="auth"
            {...register("email", {
              required: true,
              pattern: AUTH_REGEX.email
            })}
          />
          <SquareButton
            buttonSize="medium"
            buttonColor="active"
            onClick={handleDuplicate}
          >
            중복확인
          </SquareButton>
          {errors.email && (
            <div className="help-message"> {AUTH_INPUT_FIELD_ERROR.email}</div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.password}
            schema="auth"
            type="password"
            {...register("password", {
              required: true,
              pattern: AUTH_REGEX.password
            })}
          />
          {errors.password && (
            <div className="help-message">
              {AUTH_INPUT_FIELD_ERROR.password}
            </div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.checkPassword}
            schema="auth"
            type="password"
            {...register("passwordCheck", {
              required: true,
              validate: {
                matchPassword: (value) => {
                  const { password } = getValues();
                  return password === value;
                }
              }
            })}
          />
          {errors.passwordCheck && (
            <div className="help-message">
              {AUTH_INPUT_FIELD_ERROR.checkPassword}
            </div>
          )}
        </fieldset>

        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          회원가입
        </SquareButton>
      </form>
      {isError && (
        <div className="help-message">
          이미 존재하는 이메일 혹은 닉네임입니다.
        </div>
      )}
      <div className="login-check">
        계정이 이미 있으신가요? <Link to="/login">로그인</Link>
      </div>
    </UserLoginStyle>
  );
};

export default UserSignup;
