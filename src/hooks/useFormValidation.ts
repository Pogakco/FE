import { useEffect } from "react";
import { FieldValues, useForm, Path } from "react-hook-form";
import { AxiosError } from "axios";

interface Props {
  isEmailError?: AxiosError | null;
  isNicknameError?: AxiosError | null;
}
const useFormValidation = <T extends FieldValues = FieldValues>({
  isEmailError,
  isNicknameError
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    formState: { errors }
  } = useForm<T>();

  // 이메일, 닉네임 중복하면 커스텀 에러 생성
  useEffect(() => {
    console.log("에러");
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
    errors
  };
};

export default useFormValidation;
