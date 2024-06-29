import CircleButton from "@/components/Button/CircleButton";
import Drawer from "@/components/Drawer/Drawer";
import Timer from "@/components/Timer/Timer";
import { useState } from "react";
import { FaVolumeHigh, FaVolumeXmark} from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/*
const roomData: IroomData = {
  roomTitle: "뽀모도로 정예부대 구해요",
  roomDescription: `더도 말고 우리 딱 코딩으로 연봉 1억 받을 정도로만 
    열심히해요 내일도 오늘도 화이팅 코딩 열심히해서 
    맛있는 음식도 많이 먹어요`,
  totalCycles: 10,
  currentCycles: 3,
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  isRunning: true,
  maxParticipants: 20,
  currentParticipants: 15,
  ownerName: "changchangwoo",
  ownerProfileImageUrl: "https://example.com/profile.jpg"
};
*/

const RoomDetail = () => {
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const navigate = useNavigate();
  const soundHandler = () => {
    setActiveSound(!activeSound)
  }
  const exitButtonHandler = () => {
    navigate('/main');
  }
  return (
    <RoomDetailStyle>
      <div className="muteIcon" onClick={soundHandler} >
        {activeSound ? <FaVolumeXmark /> : <FaVolumeHigh /> }
      </div>
      <Drawer />
      <Timer />
      <div className="exitButton">
      <CircleButton onClick={exitButtonHandler}>
        <RiLogoutBoxRLine  />
      </CircleButton>
      </div>
    </RoomDetailStyle>
  );
};

const RoomDetailStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .muteIcon {
    position: absolute;
  top: 100px;
  right: 50px;
  font-size: 50px;
  color: #ff8080;
  cursor: pointer;
  }

  .exitButton {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
`;
export default RoomDetail;
