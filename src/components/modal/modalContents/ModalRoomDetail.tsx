import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import SquareButton from "@/components/buttons/SquareButton";
import TimerDescriptCard from "@/components/cards/TimerDescriptCard";
import RunningStatus from "@/components/commons/RunningStatus";
import Profile from "@/components/profile/Profile";
import { IroomCardData } from "@/models/room.model";
import { FaCrown } from "react-icons/fa";
import { ModalHeader, ModalRoomDetailStyle } from "../ModalStyle";
import useJoinRoom from "@/hooks/mutations/useJoinRoom";
import { AxiosError } from "axios";
import Loading from "@/components/commons/Loading";

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
    if(roomData.isJoined) navigate(`/rooms/${roomData.id}`);
    else mutate();
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
      {isPending ?
      <Loading/> :
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
            buttonColor={isError ? "default" : "active"}
            buttonSize="medium"
            onClick={handleJoinButton}
          >
            참가하기
          </SquareButton>
        )}
      </div>
      }
      {isError && error instanceof AxiosError && (
        <div className="error">{error.response?.data?.message || "에러 발생"}</div>
      )}
    </ModalRoomDetailStyle>
  );
};

export default ModalRoomDetail;
