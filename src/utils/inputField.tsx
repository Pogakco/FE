import { FaKey, FaSmile } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IInputField } from "@/components/inputField/InputField";

export const AUTH_INPUT_FIELD: IInputField[] = [
  {
    icon: <FaSmile />,
    name: "닉네임",
    placeholder: "2~19자 내로 입력해주세요"
  },
  {
    icon: <IoPerson />,
    name: "이메일",
    placeholder: "이메일을 입력해주세요"
  },
  {
    icon: <FaKey />,
    name: "비밀번호",
    placeholder: "15자 이내로 입력해주세요"
  },

  {
    icon: <FaKey />,
    name: "비밀번호 확인",
    placeholder: "비밀번호를 일치하게 입력해주세요"
  }
];
