import { UserLoginStyle } from "./UserLogin";
import Title from "@/components/user/Title";

import InputField from "@/components/inputField/InputField";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { ISignup } from "@/models/auth.model";
import useAuth from "@/hooks/useAuth";
import { AUTH_REGEX } from "@/constants/regex";
import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";
import useFormValidation from "@/hooks/useFormValidation";

const UserSignup = () => {
  const {
    userSignup,
    userCheckDuplicateEmail,
    userCheckDuplicateNickname,
    isError,
    isEmailError,
    isNicknameError
  } = useAuth();

  const { register, handleSubmit, getValues, errors } =
    useFormValidation<ISignup>({ isEmailError, isNicknameError });

  const onSubmit: SubmitHandler<ISignup> = (data) => {
    userSignup({
      nickname: data.nickname,
      email: data.email,
      password: data.password
    });
  };

  const handleDuplicate = (type: "email" | "nickname") => {
    const value = getValues(type);

    const checkDuplicate = {
      email: () => {
        userCheckDuplicateEmail({ email: value });
      },
      nickname: () => {
        userCheckDuplicateNickname({ nickname: value });
      }
    };

    checkDuplicate[type]();
  };

  return (
    <UserLoginStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.nickname}
            schema="auth"
            {...register("nickname", {
              required: {
                value: true,
                message: AUTH_INPUT_FIELD_ERROR.nickname
              },
              pattern: {
                value: AUTH_REGEX.nickname,
                message: AUTH_INPUT_FIELD_ERROR.nickname
              }
            })}
          />
          {errors.nickname && (
            <div className="help-message">{errors.nickname.message}</div>
          )}
          <SquareButton
            buttonSize="medium"
            buttonColor="active"
            onClick={() => handleDuplicate("nickname")}
          >
            중복확인
          </SquareButton>
        </fieldset>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.email}
            schema="auth"
            {...register("email", {
              required: {
                value: true,
                message: AUTH_INPUT_FIELD_ERROR.email
              },
              pattern: {
                value: AUTH_REGEX.email,
                message: AUTH_INPUT_FIELD_ERROR.email
              }
            })}
          />
          <SquareButton
            buttonSize="medium"
            buttonColor="active"
            onClick={() => handleDuplicate("email")}
          >
            중복확인
          </SquareButton>
          {errors.email && (
            <div className="help-message">{errors.email.message}</div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.password}
            schema="auth"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: AUTH_INPUT_FIELD_ERROR.password
              },
              pattern: {
                value: AUTH_REGEX.password,
                message: AUTH_INPUT_FIELD_ERROR.password
              }
            })}
          />
          {errors.password && (
            <div className="help-message">{errors.password.message}</div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.checkPassword}
            schema="auth"
            type="password"
            {...register("passwordCheck", {
              required: {
                value: true,
                message: "비밀번호 확인은 필수 입력 항목입니다."
              },
              validate: {
                matchPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "비밀번호가 일치하지 않습니다.";
                }
              }
            })}
          />
          {errors.passwordCheck && (
            <div className="help-message">{errors.passwordCheck.message}</div>
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
