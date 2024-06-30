import SquareButton from "@/components/buttons/SquareButton";
import TimerDescriptCard from "@/components/cards/TimerDescriptCard";
import Profile from "@/components/profile/Profile";
import { FaCrown } from "react-icons/fa";
import styled from "styled-components";

const ModalRoomDetail = () => {
  return (
    <ModalRoomDetailStyle>
      <Profile size="medium" url="https://cdn.univ20.com/wp-content/uploads/2015/09/c7697d7b9ec7abe362dbdfc51b355ee5.jpg" />
      <div className="userName">
        <FaCrown /> changchangwoo
      </div>
      <div className="descript">
        더도 말고 우리 딱 코딩으로 연봉 1억 받을 정도로만 열심히해요 내일도
        오늘도 화이팅 코딩 열심히해서 맛있는 음식도 많이 먹어요
      </div>
      <span>
      <TimerDescriptCard
        totalCycles={11}
        currentCycles={2}
        focusTime={3}
        shortBreakTime={4}
        longBreakTime={5}
        detail={true}
        scheme="default"
      />
      </span>
      <SquareButton buttonColor="active" buttonSize="medium">참가하기</SquareButton>
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
