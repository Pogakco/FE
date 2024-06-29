import TimerDescriptCard from "@/components/Card/TimerDescriptCard";
import { FaCrown, FaPaperclip, FaUser } from "react-icons/fa";
import styled from "styled-components";

const RoomInfo = () => {
  return (
    <RoomInfoStyle>
      <div className="title">뽀모도로 정예부대 구해요</div>
      <span><div className="statusCircle"/><div className="description">휴식중</div></span>
      <div className="avatar"></div>
      <div className="sub-title">
        <FaCrown />
        changchangwoo
      </div>
      <div className="users">
        <FaUser />6
      </div>
      <hr />
      <div className="section-title">방 정보</div>
      <div className="description">
        더도 말고 우리 딱 코딩으로 연봉 1억 받을 정도로만 열심히해요 내일도
        오늘도 화이팅 코딩 열심히해서 맛있는 음식도 많이 먹어요
      </div>
      <div className="section-title">타이머 정보</div>
      <TimerDescriptCard />
      <div className="section-title">공유하기</div>
      <span><FaPaperclip /><div className="description">https://www.figma.com/design</div></span>
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
    border-radius: 100px;
    background-color:  ${({ theme }) => theme.color.white};
  }

  .users {
    font-size: ${({ theme }) => theme.fontSize.medium};
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-end;
  }

  hr {
    background-color:  ${({ theme }) => theme.color.white};
    height: 1px;
    border: none;
    margin: 10px 0;
  }

  .statusCircle {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #43F780;
    
  }
`;
export default RoomInfo;
