import TimerDescriptCard from "@/components/cards/TimerDescriptCard";
import RunningStatus from "@/components/commons/RunningStatus";
import { IroomData } from "@/models/room.model";
import { FaCrown, FaPaperclip, FaUser } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  roomData: IroomData;
  isRunning : boolean | null;
  currentCycle : number | null;
}

const RoomInfo = ({ roomData, isRunning, currentCycle }: Props) => {
  return (
    <RoomInfoStyle>
      <div className="title">{roomData.roomTitle}</div>
      <RunningStatus isRunning={isRunning}/>
      <div className="avatar" style={{ backgroundImage: `url(${roomData.ownerProfileImageUrl})` }} />
      <div className="sub-title">
        <FaCrown />
        {roomData.ownerName}
      </div>
      <div className="users">
        <FaUser />
        {roomData.currentParticipants}/{roomData.maxParticipants}
      </div>
      <hr />
      <div className="section-title">방 정보</div>
      <div className="description">{roomData.roomDescription}</div>
      <div className="section-title">타이머 정보</div>
      <TimerDescriptCard
        totalCycles={roomData.totalCycles}
        currentCycle={currentCycle}
        focusTime={roomData.focusTime}
        shortBreakTime={roomData.shortBreakTime}
        longBreakTime={roomData.longBreakTime}
        detail={true}
        scheme="primary"
      />
      <div className="section-title">공유하기</div>
      <span>
        <FaPaperclip />
        <div className="description">https://www.figma.com/design</div>
      </span>
    </RoomInfoStyle>
  );
};

const RoomInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .title {
    font-size: ${({ theme }) => theme.fontSize.title};
    font-weight: bold;
  }

  .section-title {
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: bold;
    margin-top: 10px;
  }

  .sub-title {
    font-size: ${({ theme }) => theme.fontSize.medium};
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .description {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 400;
  }

  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 70px;
    background-color: ${({ theme }) => theme.color.white};
    background-size: cover;
    background-position: center;
  }

  .users {
    font-size: ${({ theme }) => theme.fontSize.medium};
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-end;
  }

  hr {
    background-color: ${({ theme }) => theme.color.white};
    height: 1px;
    border: none;
    margin: 10px 0;
  }

`;

export default RoomInfo;
