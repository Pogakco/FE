import { SubmitHandler, useForm } from "react-hook-form";
import { UserStyle } from "./UserStyle";
import Title from "@/components/user/Title";
import InputField from "@/components/inputField/InputField";
import { IResetPassword } from "@/models/auth.model";
import SquareButton from "@/components/buttons/SquareButton";

import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onPasswordConfirmed: () => void;
}
export const UserCheckPassword = ({ onPasswordConfirmed }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IResetPassword>();

  const navigate = useNavigate();
  const { userCheckPassword, isError, isSuccess } = useAuth();

  const onSubmit: SubmitHandler<IResetPassword> = (data: IResetPassword) => {
    userCheckPassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      onPasswordConfirmed();
      navigate("/profile");
    }
  }, [isSuccess, navigate, onPasswordConfirmed]);

  return (
    <UserStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>비밀번호 확인</Title>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.password}
            schema="auth"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="help-message">
              {AUTH_INPUT_FIELD_ERROR.password}
            </div>
          )}
        </fieldset>

        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          수정페이지로 이동하기
        </SquareButton>
        {isError && <div className="help-message">비밀번호가 틀렸습니다.</div>}
      </form>
    </UserStyle>
  );
};
