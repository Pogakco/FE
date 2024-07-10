import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import useJoinRoom from "@/hooks/mutations/useJoinRoom";
import SquareButton from "@/components/buttons/SquareButton";
import TimerDescriptCard from "@/components/cards/TimerDescriptCard";
import RunningStatus from "@/components/commons/RunningStatus";
import Profile from "@/components/profile/Profile";
import { IroomCardData } from "@/models/room.model";
import { FaCrown } from "react-icons/fa";
import { ModalHeader, ModalRoomDetailStyle } from "../ModalStyle";

interface Props {
  roomData: IroomCardData;
}

const ModalRoomDetail = ({ roomData }: Props) => {
  const isLoggedIn = useAuthStore<boolean>((state) => state.isLoggedIn);
  const { mutate, isPending, isError, error } = useJoinRoom(roomData.id);
  const navigate = useNavigate();

  const handleWatchButton = () => {
    navigate(`/rooms/${roomData.id}`);
  };

  const handleJoinButton = () => {
    mutate();
  };

  return (
    <ModalRoomDetailStyle>
      <ModalHeader>
        <h1>{roomData.roomTitle}</h1>
        <RunningStatus isRunning={roomData.isRunning} />
        <hr />
      </ModalHeader>
      <Profile size="medium" url={roomData.ownerProfileImageUrl} />
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
      <div className="buttons">
        <SquareButton
          buttonColor="active"
          buttonSize="medium"
          onClick={handleWatchButton}
        >
          관전하기
        </SquareButton>
        {isLoggedIn && (
          <SquareButton
            buttonColor="active"
            buttonSize="medium"
            onClick={handleJoinButton}
            disabled={isPending}        
          >
            참가하기
          </SquareButton>
        )}
      </div>
      {isPending && <div className="loading">로딩 중입니다...</div>}
      {isError && <div className="error"></div>}
    </ModalRoomDetailStyle>
  );
};

export default ModalRoomDetail;
