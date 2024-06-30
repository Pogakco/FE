import { UserLoginStyle } from "./UserLogin";
import Title from "@/components/user/Title";
import { FaKey, FaSmile } from "react-icons/fa";
import InputField, { IInputField } from "@/components/inputField/InputField";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignup } from "@/models/auth.model";

const AUTH_REGEX = {
  nickname: /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/, // 영문/숫자/특수문자(._-)가능. 2-10자 입력
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, //'@' 포함여부와 대문자,소문자를 구분안함
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ // 최소 8 자, 하나 이상의 대문자, 하나의 소문자 및 하나의 숫자
};

const inputfield: IInputField[] = [
  {
    icon: <FaKey />,
    name: "닉네임",
    placeholder: "2~19자 내로 입력해주세요"
  },
  {
    icon: <FaSmile />,
    name: "이메일",
    placeholder: "이메일을 입력해주세요"
  },
  {
    icon: <FaKey />,
    name: "비밀번호",
    placeholder: "15자 이내로 입력해주세요"
  },

  {
    icon: <FaKey />,
    name: "비밀번호 확인",
    placeholder: "비밀번호를 일치하게 입력해주세요"
  }
];

const UserSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignup>();

  const onSubmit: SubmitHandler<ISignup> = (data) => console.log(data);

  console.log(errors);

  return (
    <UserLoginStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>

        <fieldset>
          <InputField
            inputfield={inputfield[0]}
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
              영문/숫자/특수문자(._-)가능. 2-10자 입력
            </div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={inputfield[1]}
            schema="auth"
            {...register("email", {
              required: true,
              pattern: AUTH_REGEX.email
            })}
          />
          {errors?.email?.type === "required" && (
            <div className="help-message">이메일을 입력해주세요</div>
          )}
          {errors?.email?.type === "pattern" && (
            <div className="help-message">이메일 형식에 맞게 입력해주세요</div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={inputfield[2]}
            schema="auth"
            {...register("password", {
              required: true,
              pattern: AUTH_REGEX.password
            })}
          />
          {errors.password && (
            <div className="help-message">
              최소 8 자, 하나 이상의 대문자, 하나의 소문자
            </div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={inputfield[3]}
            schema="auth"
            {...register("passwordCheck", { required: true })}
          />
          {errors.passwordCheck && (
            <div className="help-message">이메일을 입력해주세요</div>
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
