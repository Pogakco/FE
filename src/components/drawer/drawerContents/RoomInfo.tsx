import TimerDescriptCard from "@/components/cards/TimerDescriptCard";
import RunningStatus from "@/components/commons/RunningStatus";
import Profile from "@/components/profile/Profile";
import { IroomData } from "@/models/room.model";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FaCrown, FaPaperclip, FaUser } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  roomData: IroomData;
  isRunning: boolean | null;
  currentCycle: number | null;
}

const RoomInfo = ({ roomData, isRunning, currentCycle }: Props) => {
  const urlRef = useRef<HTMLDivElement>(null);

  const handleURL = () => {
    if (urlRef.current) {
      const urlText = urlRef.current.innerText;
      navigator.clipboard.writeText(urlText).then(() => {
        toast.success("URL이 클립보드에 복사되었습니다.");
      }).catch(err => {
        toast.error("클립보드 복사 중 오류가 발생했습니다:", err);
      });
    }
  };

  return (
    <RoomInfoStyle>
      <div className="title">{roomData.roomTitle}</div>
      <RunningStatus isRunning={isRunning}/>
      <Profile size="medium" url={roomData.ownerProfileImageUrl} />
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
        currentCycle={currentCycle ? currentCycle : 0}
        focusTime={roomData.focusTime}
        shortBreakTime={roomData.shortBreakTime}
        longBreakTime={roomData.longBreakTime}
        detail={true}
        scheme="primary"
      />
      <div className="section-title">공유하기</div>
      <span>
        <FaPaperclip />
        <div className="clipboard" ref={urlRef} onClick={handleURL} style={{ cursor: 'pointer' }}>
          {window.location.href}
        </div>
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

  .clipboard {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 400;
    cursor: pointer;
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
