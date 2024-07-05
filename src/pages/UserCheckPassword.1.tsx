import { SubmitHandler, useForm } from "react-hook-form";
import { UserLoginStyle } from "./UserLogin";
import Title from "@/components/user/Title";
import InputField from "@/components/inputField/InputField";
import { IRessetPassword } from "@/models/auth.model";
import SquareButton from "@/components/buttons/SquareButton";

import { AUTH_INPUT_FIELD, AUTH_INPUT_FIELD_ERROR } from "@/utils/inputField";

export const UserCheckPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRessetPassword>();

  const onSubmit: SubmitHandler<IRessetPassword> = (data) => console.log(data);

  return (
    <UserLoginStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>비밀번호 확인</Title>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.password}
            schema="auth"
            type="password"
            {...register("passwordCheck", { required: true })}
          />
          {errors.passwordCheck && (
            <div className="help-message">
              {AUTH_INPUT_FIELD_ERROR.password}
            </div>
          )}
        </fieldset>

        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          수정페이지로 이동하기
        </SquareButton>
      </form>
    </UserLoginStyle>
  );
};
