import CircleButton from "@/components/buttons/CircleButton";
import SquareButton from "@/components/buttons/SquareButton";
import InputField from "@/components/inputField/InputField";
import Profile from "@/components/profile/Profile";
import { ISignup } from "@/models/auth.model";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import { UserLoginStyle } from "./UserLogin";
import { AUTH_REGEX } from "@/constants/regex";
import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";

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
            inputfield={AUTH_INPUT_FIELD.email}
            schema="auth"
            disabled={true}
          />
        </fieldset>
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
          <SquareButton buttonSize="medium" buttonColor="active" type="button">
            중복확인
          </SquareButton>
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
