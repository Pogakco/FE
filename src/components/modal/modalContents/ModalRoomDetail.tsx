import SquareButton from "@/components/buttons/SquareButton";
import TimerDescriptCard from "@/components/cards/TimerDescriptCard";
import RunningStatus from "@/components/commons/RunningStatus";
import Profile from "@/components/profile/Profile";
import { IroomData } from "@/models/room.model";
import { FaCrown } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  roomData: IroomData;
}

const ModalRoomDetail = ({ roomData }: Props) => {
  return (
    <ModalRoomDetailStyle>
      <div className="modalHeader">
        <h1>{roomData.roomTitle}</h1>
        <RunningStatus isRunning={roomData.isRunning} />
        <hr />
      </div>
      <Profile
        size="medium"
        url="https://cdn.univ20.com/wp-content/uploads/2015/09/c7697d7b9ec7abe362dbdfc51b355ee5.jpg"
      />
      <div className="userName">
        <FaCrown /> {roomData.ownerName}
      </div>
      <div className="descript">{roomData.roomDescription}</div>
      <span>
        <TimerDescriptCard
          totalCycles={roomData.totalCycles}
          currentCycles={roomData.currentCycles}
          focusTime={roomData.focusTime}
          shortBreakTime={roomData.shortBreakTime}
          longBreakTime={roomData.longBreakTime}
          detail={true}
          scheme="default"
        />
      </span>
      <SquareButton buttonColor="active" buttonSize="medium">
        참가하기
      </SquareButton>
    </ModalRoomDetailStyle>
  );
};

const ModalRoomDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0px 30px;

  .modalHeader {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    h1 {
      text-align: center;
      font-size: ${({ theme }) => theme.fontSize.large};
      font-weight: bold;
    }
    hr {
      width: 100%;
      background-color: ${({ theme }) => theme.color.grey1};
      height: 1px;
      border: none;
    }
  }

  span {
    border: 1px solid ${({ theme }) => theme.color.grey1};
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }
  .userName {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: bold;
  }
  .descript {
    width: 100%;
    height: 42px;
    font-size: ${({ theme }) => theme.fontSize.small};
    margin-bottom: 20px;
    text-align: center;
    color: ${({ theme }) => theme.color.grey3};
  }
`;
export default ModalRoomDetail;
