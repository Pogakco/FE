import CircleButton from "@/components/buttons/CircleButton";
import SquareButton from "@/components/buttons/SquareButton";
import InputField from "@/components/inputField/InputField";
import Profile from "@/components/profile/Profile";
import { ISignup } from "@/models/auth.model";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import { UserLoginStyle } from "./UserLogin";
import { AUTH_REGEX, INPUT_FIELD } from "./UserSignup";

type TProfile = Omit<ISignup, "email">;

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<TProfile>();

  const onSubmit: SubmitHandler<TProfile> = (data) => console.log(data);

  return (
    <UserProfileStyle>
      <div className="header">
        <Profile size="large" />
        <CircleButton buttonSize="small">
          <BiPlus />
        </CircleButton>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <InputField
            inputfield={INPUT_FIELD[1]}
            schema="auth"
            disabled={true}
          />
        </fieldset>
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
              영문/숫자/특수문자(._-)가능. 2-10자 입력
            </div>
          )}
          <SquareButton buttonSize="medium" buttonColor="active" type="button">
            중복확인
          </SquareButton>
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
            <div className="help-message">비밀번호를 입력해주세요</div>
          )}
          {errors?.password?.type === "pattern" && (
            <div className="help-message">
              최소 8 자, 하나 이상의 대문자, 하나의 소문자 및 하나의 숫자
            </div>
          )}
        </fieldset>
        <fieldset>
          <InputField
            inputfield={INPUT_FIELD[3]}
            schema="auth"
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
            <div className="help-message">비밀번호를 다시 입력해주세요</div>
          )}
        </fieldset>
        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          프로필 수정하기
        </SquareButton>
      </form>
    </UserProfileStyle>
  );
};

const UserProfileStyle = styled(UserLoginStyle)`
  .header {
    width: fit-content;
    height: fit-content;
    margin: 0 auto 50px;
    position: relative;

    button {
      position: absolute;
      top: 195px;
      right: 10px;
    }
  }
`;
export default UserProfile;
