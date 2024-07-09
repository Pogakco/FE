import { useEffect } from "react";
import { FieldValues, useForm, Path } from "react-hook-form";
import useAuth from "./useAuth";

const useFormValidation = <T extends FieldValues = FieldValues>() => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<T>();

  const {
    userCheckDuplicateEmail,
    userCheckDuplicateNickname,
    isEmailError,
    isNicknameError
  } = useAuth();

  // 중복 검사
  const handleDuplicate = (type: "email" | "nickname") => {
    const value = getValues(type as Path<T>);

    const checkDuplicate = {
      email: () => {
        userCheckDuplicateEmail({ email: value });
      },
      nickname: () => {
        userCheckDuplicateNickname({ nickname: value });
      }
    };

    checkDuplicate[type]();
  };

  // 이메일, 닉네임 중복하면 커스텀 에러 생성
  useEffect(() => {
    if (isEmailError) {
      setError("email" as Path<T>, {
        type: "email-duplicate",
        message: "이미 존재하는 이메일입니다"
      });
    }

    if (isNicknameError) {
      setError("nickname" as Path<T>, {
        type: "nickname-duplicate",
        message: "이미 존재하는 닉네임입니다"
      });
    }
  }, [isEmailError, isNicknameError, setError]);

  return {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    setValue,
    errors,
    handleDuplicate
  };
};

export default useFormValidation;
