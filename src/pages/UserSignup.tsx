import { UserLoginStyle } from "./UserLogin";
import Title from "@/components/user/Title";
import { FaKey, FaSmile } from "react-icons/fa";
import InputField, { IInputField } from "@/components/inputField/InputField";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignup } from "@/models/auth.model";
import { useEffect } from "react";

export const AUTH_REGEX = {
  nickname: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/, // 닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 가능
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, //'@' 포함여부와 대문자,소문자를 구분안함
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/ //영문, 숫자, 특수문자((@, $, !, %, *, #, ?, &) 각각 하나 이상 포함, 8~20자리 가능
};

export const INPUT_FIELD: IInputField[] = [
  {
    icon: <FaKey />,
    title: "닉네임",
    placeholder: "2~19자 내로 입력해주세요"
  },
  {
    icon: <FaSmile />,
    title: "이메일",
    placeholder: "이메일을 입력해주세요"
  },
  {
    icon: <FaKey />,
    title: "비밀번호",
    placeholder: "15자 이내로 입력해주세요"
  },

  {
    icon: <FaKey />,
    title: "비밀번호 확인",
    placeholder: "비밀번호를 일치하게 입력해주세요"
  }
];

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

  const onSubmit: SubmitHandler<ISignup> = (data) => console.log(data);

  const handleDuplicate = () => {};

  // // [비밀번호] value 수정 시 이미 입력된 [비밀번호 확인] value 도 같이 유효성 체크
  // useEffect(() => {
  //   if (
  //     watch("password") !== watch("passwordCheck") &&
  //     watch("passwordCheck")
  //   ) {
  //     setError("passwordCheck", {
  //       type: "password-mismatch",
  //       message: "비밀번호가 일치하지 않습니다"
  //     });
  //   } else {
  //     // 비밀번호 일치시 오류 제거
  //     clearErrors("passwordCheck");
  //   }
  // }, [watch("password"), watch("passwordCheck")]);

  return (
    <UserLoginStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <fieldset>
          <InputField
            inputfield={INPUT_FIELD[0]}
            schema="auth"
            {...register("nickname", {
              required: true,
              pattern: AUTH_REGEX.nickname
            })}
          />
          {errors?.nickname?.type === "required" && (
            <div className="help-message">닉네임을 입력해주세요</div>
          )}
          {errors?.nickname?.type === "pattern" && (
            <div className="help-message">
              한글, 영문, 숫자만 가능하며 2-10자리 입력
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
            inputfield={INPUT_FIELD[1]}
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
          {errors?.email?.type === "required" && (
            <div className="help-message">이메일을 입력해주세요</div>
          )}
          {errors?.email?.type === "pattern" && (
            <div className="help-message">이메일 형식이 아닙니다</div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={INPUT_FIELD[2]}
            schema="auth"
            type="password"
            {...register("password", {
              required: true,
              pattern: AUTH_REGEX.password
            })}
          />
          {errors?.password?.type === "required" && (
            <div className="help-message">패스워드를 입력해주세요</div>
          )}
          {errors?.password?.type === "pattern" && (
            <div className="help-message">
              영문, 숫자, 특수문자를 각각 하나 이상 포함하며 8~20자리 입력
            </div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={INPUT_FIELD[3]}
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
            <div className="help-message">비밀번호가 일치하지 않습니다.</div>
          )}
        </fieldset>

        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          회원가입
        </SquareButton>
      </form>
      <div className="login-check">
        계정이 이미 있으신가요? <Link to="/login">로그인</Link>
      </div>
    </UserLoginStyle>
  );
};

export default UserSignup;
