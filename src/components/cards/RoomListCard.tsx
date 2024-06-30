import styled from "styled-components";
import TimerDescriptCard from "./TimerDescriptCard";
import { FaCrown, FaUser } from "react-icons/fa";

const RoomListCard = () => {
  return (
    <RoomListCardStyle>
      <div className="roomHeader">
        <div className="roomTitle">코딩 잘해지고 싶은 사람만</div>
        <div className="roomStatus">
          <div
            className="statusCircle"
            style={{ backgroundColor: false ? "#F44444" : "#43F780" }}
          />
          <div className="description">{false ? "집중" : "휴식"}</div>
        </div>
      </div>
      <TimerDescriptCard
        totalCycles={10}
        currentCycles={3}
        focusTime={30}
        shortBreakTime={30}
        longBreakTime={5}
        detail={false}
      />
      <div className="roomOwner">
        <p>
        <FaCrown />
        changchangwoo
        </p>
        <p>
        <FaUser />
        {3}/{10}회
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

  .roomHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;
  }

  .roomTitle {
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
    p{
        display: flex;
        gap: 5px;
        align-items: center;
    }
  }
`;

export default RoomListCard;
