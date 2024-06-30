import SquareButton from "@/components/buttons/SquareButton";
import InputField, { IInputField } from "@/components/inputField/InputField";
import { CgSandClock } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { IoIosAlarm } from "react-icons/io";
import styled from "styled-components";

const roomInfoInput: IInputField[] = [
  {
    name: "방 제목",
  },
  {
    name: "상세 설명",
  },
  {
    name: "수용 인원",
  }
];

const timerInfoInput: IInputField[] = [
  {
    icon: <FaBook />,
    name: "집중시간",
  },
  {
    icon: <CgSandClock />,
    name: "휴식시간",
  },
  {
    icon: <IoIosAlarm />,
    name: "대 휴식",
  },

  {
    icon: <GiTomato />,
    name: "뽀모도로 사이클",
  }
];

const ModalRoomCreate = () => {
  return (
    <ModalRoomCreateStyle>
      <form>
        <h1>방 정보</h1>
        {roomInfoInput.map((item, index) => (
          <InputField
            inputfield={item}
            schema="auth"
            isError={false}
            key={index}
          />
        ))}
        <p/>
        <h1>타이머 정보</h1>
        {timerInfoInput.map((item, index) => (
          <InputField
            inputfield={item}
            schema="auth"
            isError={false}
            key={index}
          />
        ))}

        <ButtonContainer>
          <SquareButton buttonColor="active" buttonSize="medium" type="submit">생성하기</SquareButton>
        </ButtonContainer>
      </form>
    </ModalRoomCreateStyle>
  );
};

const ModalRoomCreateStyle = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 5px;

    p {
        margin-bottom: 20px;
    }

    h1 {
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSize.medium};
      margin-bottom: 5px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default ModalRoomCreate;
