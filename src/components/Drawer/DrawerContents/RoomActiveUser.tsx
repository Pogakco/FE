import styled from "styled-components";
import UserListCard from "./UserListCard";
import { FaUser } from "react-icons/fa";

const RoomActvieUser = () => {
  return (
    <RoomActvieUserStyle>
      <div className="title">참여중인 유저</div>
      <div className="users">
        <FaUser />6
      </div>
      <hr />

      <div className="userList">
        {Array.from({ length: 17 }).map((_, index) => (
          <UserListCard key={index} />
        ))}
      </div>
    </RoomActvieUserStyle>
  );
};

const RoomActvieUserStyle = styled.div`
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
    border-radius: 8px;
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
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
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

export default RoomActvieUser;
