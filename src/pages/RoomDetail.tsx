import Drawer from "@/components/Drawer/Drawer";
import Timer from "@/components/RoomDetail/Timer";
import { IroomData } from "@/models/room.model";
import { FaVolumeMute } from "react-icons/fa";
import styled from "styled-components";

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

const RoomDetail = () => {
  return (
    <RoomDetailStyle>
      <MuteIcon>
        <FaVolumeMute />
      </MuteIcon>
      <Drawer />
      <Timer />
    </RoomDetailStyle>
  );
};

const MuteIcon = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  font-size: 50px;
  color: #ff8080;
  cursor: pointer;
`;

const RoomDetailStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export default RoomDetail;
