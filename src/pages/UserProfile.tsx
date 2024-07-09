import SquareButton from "@/components/buttons/SquareButton";
import InputField from "@/components/inputField/InputField";
import { ISignup } from "@/models/auth.model";
import { SubmitHandler } from "react-hook-form";
import { UserProfileStyle } from "./UserStyle";
import { AUTH_REGEX } from "@/constants/regex";
import {
  AUTH_INPUT_FIELD,
  AUTH_INPUT_FIELD_ERROR
} from "@/constants/inputField";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import UserImage from "@/components/user/userProfile/UserImage";

type TChangeProfile = Omit<ISignup, "email">;

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    handleDuplicate
  } = useFormValidation<TChangeProfile>();

  const onSubmit: SubmitHandler<TChangeProfile> = (data) => console.log(data);

  const { userProfile, profile } = useAuth();

  // 페이지 마운트 될 때 내 프로필 정보 가져옴
  useEffect(() => {
    userProfile();
  }, [userProfile]);

  // profile이 업데이트 될 때 닉네임 필드 값 업데이트
  useEffect(() => {
    setValue("nickname", profile?.nickname || "");
  }, [profile, setValue]);

  return (
    <UserProfileStyle>
      <div className="profile-content">
        <div className="header">
          <UserImage url={profile?.profileImageUrl || null} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputField
              inputfield={AUTH_INPUT_FIELD.email}
              schema="auth"
              disabled={true}
              value={profile?.email || ""}
            />
          </fieldset>
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
            {errors.nickname && (
              <div className="help-message">{errors.nickname?.message}</div>
            )}
            <SquareButton
              buttonSize="medium"
              buttonColor="active"
              type="button"
              onClick={() => handleDuplicate("nickname")}
            >
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
      </div>
    </UserProfileStyle>
  );
};

export default UserProfile;
