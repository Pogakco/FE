import { SubmitHandler, useForm } from "react-hook-form";
import { UserLoginStyle } from "./UserLogin";
import Title from "@/components/user/Title";
import InputField from "@/components/inputField/InputField";
import { IRessetPassword } from "@/models/auth.model";
import SquareButton from "@/components/buttons/SquareButton";

import { AUTH_INPUT_FIELD } from "@/utils/inputField";

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
            inputfield={AUTH_INPUT_FIELD[2]}
            schema="auth"
            type="password"
            {...register("passwordCheck", { required: true })}
          />
          {errors?.passwordCheck?.type === "required" && (
            <div className="help-message">비밀번호를 입력해주세요</div>
          )}
        </fieldset>

        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          수정페이지로 이동하기
        </SquareButton>
      </form>
    </UserLoginStyle>
  );
};
