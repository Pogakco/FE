import SquareButton from "@/components/buttons/SquareButton";
import InputField, { IInputField } from "@/components/inputField/InputField";
import { CgSandClock } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { IoIosAlarm } from "react-icons/io";
import { ModalHeader, ModalRoomCreateStyle } from "../ModalStyle";

const roomInfoInput: IInputField[] = [
  {
    name: "방 제목"
  },
  {
    name: "상세 설명"
  },
  {
    name: "수용 인원"
  }
];

const timerInfoInput: IInputField[] = [
  {
    icon: <FaBook />,
    name: "집중시간"
  },
  {
    icon: <CgSandClock />,
    name: "휴식시간"
  },
  {
    icon: <IoIosAlarm />,
    name: "대 휴식"
  },

  {
    icon: <GiTomato />,
    name: "뽀모도로 사이클"
  }
];

const ModalRoomCreate = () => {
  return (
    <ModalRoomCreateStyle>
      <ModalHeader>
        <h1>방 생성하기</h1>
        <hr />
      </ModalHeader>
      <form>
        <div className="title">방 정보</div>
        {roomInfoInput.map((item, index) => (
          <InputField
            inputfield={item}
            schema="auth"
            key={index}
          />
        ))}
        <div className="title">타이머 정보</div>
        {timerInfoInput.map((item, index) => (
          <InputField
            inputfield={item}
            schema="auth"
            key={index}
          />
        ))}
        <div className="buttonContainer">
          <SquareButton buttonColor="active" buttonSize="medium" type="submit">
            생성하기
          </SquareButton>
        </div>
      </form>
    </ModalRoomCreateStyle>
  );
};



export default ModalRoomCreate;
