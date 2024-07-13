import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { IParticipant } from "@/models/roomDetail.model";
import UserListBox from "./UserListBox";

interface Props {
  participants: IParticipant[];
  activeUsers: number;
}

const RoomActiveUser = ({ participants, activeUsers }: Props) => {
  if (activeUsers === undefined || participants === undefined) {
    return null;
  }
  const sortedParticipants = [...participants].sort((a, b) => b.pomodoroCount - a.pomodoroCount);

  return (
    <RoomActiveUserStyle>
      <div className="title">참여중인 유저</div>
      <div className="users">
        <FaUser />{activeUsers}
      </div>
      <hr />

      <div className="userList">
        {sortedParticipants && sortedParticipants.map((user, index) => (
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
