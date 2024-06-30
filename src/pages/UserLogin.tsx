import InputField, { IInputField } from "@/components/inputField/InputField";
import styled from "styled-components";
import { FaSmile, FaKey } from "react-icons/fa";
import Title from "@/components/user/Title";
import SquareButton from "@/components/buttons/SquareButton";
import { Link } from "react-router-dom";

const inputfield: IInputField[] = [
  {
    icon: <FaSmile />,
    name: "이메일",
    placeholder: "이메일을 입력해주세요"
  },
  {
    icon: <FaKey />,
    name: "비밀번호",
    placeholder: "15자 이내로 입력해주세요"
  }
];

const UserLogin = () => {
  return (
    <UserLoginStyle>
      <form>
        <Title>로그인</Title>
        {inputfield.map((item, i) => (
          <InputField inputfield={item} schema="auth" isError={false} key={i} />
        ))}
        <SquareButton buttonColor="active" buttonSize="large" type="submit">
          로그인
        </SquareButton>
      </form>
      <div className="login-check">
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </div>
    </UserLoginStyle>
  );
};

export const UserLoginStyle = styled.main`
  position: absolute;
  inset: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${({ theme }) => theme.layoutWidth.auth};

  form {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: 0 auto;
    width: 100%;
  }

  .login-check {
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.color.grey3};
    text-align: center;
    margin: 29px 0 0 0;
    a {
      color: ${({ theme }) => theme.color.black};
    }
  }
`;
export default UserLogin;
