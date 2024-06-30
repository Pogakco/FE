import styled from "styled-components";
import { UserLoginStyle } from "./UserLogin";
import Title from "@/components/user/Title";
import { FaKey, FaSmile } from "react-icons/fa";
import InputField, { IInputField } from "@/components/inputField/InputField";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";

const inputfield: IInputField[] = [
  {
    icon: <FaKey />,
    name: "닉네임",
    placeholder: "2~19자 내로 입력해주세요"
  },
  {
    icon: <FaSmile />,
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

const UserSignup = () => (
  <UserLoginStyle>
    <form>
      <Title>회원가입</Title>
      {inputfield.map((item, i) => (
        <InputField inputfield={item} schema="auth" isError={false} key={i} />
      ))}
      <SquareButton buttonColor="active" buttonSize="large" type="submit">
        회원가입
      </SquareButton>
    </form>
    <div className="login-check">
      계정이 이미 있으신가요? <Link to="/login">로그인</Link>
    </div>
  </UserLoginStyle>
);

export default UserSignup;
