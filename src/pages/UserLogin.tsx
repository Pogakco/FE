import InputField from "@/components/inputField/InputField";
import Title from "@/components/user/Title";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "@/models/auth.model";
import useAuth from "@/hooks/useAuth";
import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";
import { UserStyle } from "./UserStyle";

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>();

  const { userLogin, isError } = useAuth();

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    userLogin(data);
  };

  return (
    <UserStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>
        <fieldset>
          <InputField
            inputfield={AUTH_INPUT_FIELD.email}
            schema="auth"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div className="help-message">{AUTH_INPUT_FIELD_ERROR.email}</div>
          )}
        </fieldset>
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
          로그인
        </SquareButton>
      </form>
      {isError && (
        <div className="help-message">이메일 또는 비밀번호가 틀렸습니다.</div>
      )}
      <div className="login-check">
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </div>
    </UserStyle>
  );
};

export default UserLogin;
