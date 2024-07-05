import { FaKey, FaSmile } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IInputField } from "@/components/inputField/InputField";

export type AUTH_TYPE = "nickname" | "email" | "password" | "checkPassword";

export const AUTH_INPUT_FIELD: { [key in AUTH_TYPE]: IInputField } = {
  nickname: {
    icon: <FaSmile />,
    name: "닉네임",
    placeholder: "2-10자 이내로 입력해주세요"
  },
  email: {
    icon: <IoPerson />,
    name: "이메일",
    placeholder: "이메일을 입력해주세요"
  },
  password: {
    icon: <FaKey />,
    name: "비밀번호",
    placeholder: "8-20자 이내로 입력해주세요"
  },

  checkPassword: {
    icon: <FaKey />,
    name: "비밀번호 확인",
    placeholder: "비밀번호를 일치하게 입력해주세요"
  }
};

export const AUTH_INPUT_FIELD_ERROR: { [key in AUTH_TYPE]: string } = {
  nickname: "한글, 영문, 숫자만 가능하며 2-10자리 입력",
  email: "이메일 형식이 아닙니다",
  password: "영문, 숫자, 특수문자를 각각 하나 이상 포함, 8~20자리 입력",
  checkPassword: "비밀번호가 일치하지 않습니다."
};
