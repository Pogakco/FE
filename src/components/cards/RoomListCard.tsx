import styled from "styled-components";
import TimerDescriptCard from "./TimerDescriptCard";
import { FaCrown, FaUser } from "react-icons/fa";
import { IroomCardData } from "@/models/room.model";
import RunningStatus from "../commons/RunningStatus";


interface Props {
  roomData: IroomCardData
  onClick: (roomData: IroomCardData) => void;
}

const RoomListCard = ({ roomData, onClick }: Props) => {
  const handleClick = () => {
    onClick(roomData);
  };

  return (
    <RoomListCardStyle onClick={handleClick}>
      <div className="roomHeader">
        <div className="roomTitle">{roomData.roomTitle}</div>
        <RunningStatus isRunning={roomData.isRunning} />
      </div>
      <TimerDescriptCard
        totalCycles={roomData.totalCycles}
        currentCycle={roomData.currentCycles}
        focusTime={roomData.focusTime}
        shortBreakTime={roomData.shortBreakTime}
        longBreakTime={roomData.longBreakTime}
        detail={false}
        scheme="default"
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
  background-color: #FFFFFF;
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
    width: 80%;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize.medium};
    display: flex;
    justify-content: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
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
