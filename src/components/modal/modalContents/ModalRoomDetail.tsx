import SquareButton from "@/components/buttons/SquareButton";
import TimerDescriptCard from "@/components/cards/TimerDescriptCard";
import RunningStatus from "@/components/commons/RunningStatus";
import Profile from "@/components/profile/Profile";
import { IroomCardData } from "@/models/room.model";
import { FaCrown } from "react-icons/fa";
import { ModalHeader, ModalRoomDetailStyle } from "../ModalStyle";
import { useNavigate } from "react-router-dom";

interface Props {
  roomData: IroomCardData;
}

const ModalRoomDetail = ({ roomData }: Props) => {
    
  const navigate = useNavigate();
  const handleButton = () => {
    navigate(`/rooms/${roomData.id}`)
  }
  return (
    <ModalRoomDetailStyle>
      <ModalHeader>
        <h1>{roomData.roomTitle}</h1>
        <RunningStatus isRunning={roomData.isRunning} />
        <hr />
      </ModalHeader>
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
          currentCycle={roomData.currentCycles}
          focusTime={roomData.focusTime}
          shortBreakTime={roomData.shortBreakTime}
          longBreakTime={roomData.longBreakTime}
          detail={true}
          scheme="default"
        />
      </span>
      <SquareButton buttonColor="active" buttonSize="medium" onClick={handleButton}>
        참가하기
      </SquareButton>
    </ModalRoomDetailStyle>
  );
};


export default ModalRoomDetail;
