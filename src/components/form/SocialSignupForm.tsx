import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";
import { AUTH_REGEX } from "@/constants/regex";
import { useSocialSignup } from "@/hooks/useOauth";
import { ISocialSignup } from "@/models/oauth.model";
import { UserStyle } from "@/pages/UserStyle";
import { SubmitHandler, useForm } from "react-hook-form";
import SquareButton from "../buttons/SquareButton";
import InputField from "../inputField/InputField";

interface FormInputs {
  nickname: string;
  email: string;
}

const SocialSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISocialSignup>();

  const { mutate: signup } = useSocialSignup();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { email, nickname } = data;
    signup({ email, nickname, provider: "KAKAO" });
  };

  return (
    <UserStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <SquareButton
            buttonSize="medium"
            buttonColor="active"
            onClick={() => {}}
          >
            중복확인
          </SquareButton>
          {errors.nickname && (
            <div className="help-message">{errors.nickname.message}</div>
          )}
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
            onClick={() => {}}
          >
            중복확인
          </SquareButton>
          {errors.email && (
            <div className="help-message">{errors.email.message}</div>
          )}
        </fieldset>
        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          회원가입
        </SquareButton>
      </form>
    </UserStyle>
  );
};

export default SocialSignupForm;
