import styled from "styled-components";
import TimerDescriptCard from "./TimerDescriptCard";
import { FaCrown, FaUser } from "react-icons/fa";
import { IroomData } from "@/models/room.model";

interface Props {
  roomData: IroomData;
}

const RoomListCard = ({ roomData }: Props) => {
  return (
    <RoomListCardStyle>
      <div className="roomHeader">
        <div className="roomTitle">{roomData.roomTitle}</div>
        <div className="roomStatus">
          <div
            className="statusCircle"
            style={{ backgroundColor: roomData.isRunning ? "#FF8080" : "#43F780" }}
          />
          <div className="description">{roomData.isRunning ? "집중" : "휴식"}</div>
        </div>
      </div>
      <TimerDescriptCard
        totalCycles={roomData.totalCycles}
        currentCycles={roomData.currentCycles}
        focusTime={roomData.focusTime}
        shortBreakTime={roomData.shortBreakTime}
        longBreakTime={roomData.longBreakTime}
        detail={false}
      />
      <div className="roomOwner">
        <p>
          <FaCrown />
          {roomData.ownerName}
        </p>
        <p>
          <FaUser />
          {roomData.currentParticipants}/{roomData.maxParticipants}
        </p>
      </div>
    </RoomListCardStyle>
  );
};

const RoomListCardStyle = styled.div`
  width: 100%;
  height: 160px;
  border: 1px solid ${({ theme }) => theme.color.grey1};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.white};;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    scale: 1.05;
  }

  .roomHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;
  }

  .roomTitle {
    margin-top: 10px;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize.medium};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .roomStatus {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .statusCircle {
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }

  .description {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 400;
  }

  .roomOwner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    color: ${({ theme }) => theme.color.grey3};
    font-size: ${({ theme }) => theme.fontSize.small};
    p {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }
`;

export default RoomListCard;
