import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";
import { AUTH_REGEX } from "@/constants/regex";
import {
  useDuplicateEmail,
  useDuplicateNickname
} from "@/hooks/mutations/useAuth";
import { useSocialSignup } from "@/hooks/useOauth";
import { ISocialSignup, TProvider } from "@/models/oauth.model";
import { UserStyle } from "@/pages/UserStyle";
import { SubmitHandler, useForm } from "react-hook-form";
import SquareButton from "../buttons/SquareButton";
import InputField from "../inputField/InputField";
import Title from "../user/Title";

interface Props {
  provider: TProvider;
}
interface FormInputs {
  nickname: string;
  email: string;
}

const SocialSignupForm = ({ provider }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ISocialSignup>();

  const { mutate: signup } = useSocialSignup();
  const { mutate: duplicateNickname, isSuccess: isNotDuplicatedNickname } =
    useDuplicateNickname();
  const { mutate: duplicateEmail, isSuccess: isNotDuplicatedEmail } =
    useDuplicateEmail();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { email, nickname } = data;
    signup({ email, nickname, provider });
  };

  return (
    <UserStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>소셜 회원가입</Title>
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
            onClick={() => duplicateNickname(getValues("nickname"))}
            type="button"
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
            onClick={() => duplicateEmail(getValues("email"))}
            type="button"
          >
            중복확인
          </SquareButton>
          {errors.email && (
            <div className="help-message">{errors.email.message}</div>
          )}
        </fieldset>

        <SquareButton
          buttonColor="active"
          buttonSize="large"
          type="submit"
          disabled={!isNotDuplicatedEmail || !isNotDuplicatedNickname}
        >
          회원가입
        </SquareButton>
      </form>
    </UserStyle>
  );
};

export default SocialSignupForm;
