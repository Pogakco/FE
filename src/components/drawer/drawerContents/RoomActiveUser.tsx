import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { IParticipant } from "@/models/roomDetail.model";
import UserListBox from "./UserListBox";

interface Props {
  participants: IParticipant[] | null;
  activeUsers: number;
  linkedUserIds: number[] | null;
}

const RoomActiveUser = ({ participants, activeUsers, linkedUserIds }: Props) => {
  if (activeUsers === null || participants === null || linkedUserIds === null) {
    return null;
  }
  const sortedParticipants = [...participants].sort((a, b) => b.pomodoroCount - a.pomodoroCount);
  const userList = sortedParticipants.map((user) => ({
    ...user,
    isWaiting: user.id ? (linkedUserIds.includes(user.id) && user.isActive) : false
    // 소켓에 연결됐으면서 && Joined 상태이다 => 실시간 참여
    // 소켓에 연결됐지만 && Joined가 아니다 => 대기 중
  }));

  return (
    <RoomActiveUserStyle>
      <div className="title">참여중인 유저</div>
      <div className="users">
        <FaUser />{activeUsers}
      </div>
      <hr />

      <div className="userList">
        {userList && userList.map((user, index) => (
          <UserListBox rank={index} user={user} key={index} />
        ))}
      </div>
    </RoomActiveUserStyle>
  );
};

const RoomActiveUserStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    font-size: ${({ theme }) => theme.fontSize.title};
    font-weight: bold;
  }

  .rankBox {
    width: 25px;
    height: 25px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background-color: ${({ theme }) => theme.color.grey4};
  }

  hr {
    background-color: ${({ theme }) => theme.color.white};
    height: 1px;
    border: none;
    margin: 0px 0;
  }

  .userList {
    width: 100%;
    padding: 20px;
    min-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    border: 1px solid ${({ theme }) => theme.color.grey1};
  }

  .users {
    font-size: ${({ theme }) => theme.fontSize.medium};
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-end;
  }
`;

export default RoomActiveUser;
