import { useState } from 'react';
import RoomListCard from "@/components/cards/RoomListCard";
import styled from "styled-components";
import CircleButton from '@/components/buttons/CircleButton';
import { IoMdAdd } from 'react-icons/io';

const Main = () => {
  const [isRunningChecked, setIsRunningChecked] = useState<boolean>(false);
  const [isRoomTypeChecked, setIsRoomTypeChecked] = useState<string>("all");

  const handleCheckboxChange = () => {
    setIsRunningChecked(!isRunningChecked);
  };

  const handleRoomTypeChange = (type: string) => () => {
    setIsRoomTypeChecked(type);
  };

  return (
    <MainStyle>
      <div className="mainContents">
        <h1 className="title">#뽀모도로 친구들</h1>
        <span className="buttonGroup">
          <button onClick={handleRoomTypeChange("all")} className={`button ${isRoomTypeChecked === "all" ? "active" : ""}`}>전체 방</button>
          <button onClick={handleRoomTypeChange("filter")} className={`button ${isRoomTypeChecked === "filter" ? "active" : ""}`}>참여한 방</button>
        </span>
        <span className={`options ${isRunningChecked ? "checked" : ""}`}>
          <input 
            type="checkbox" 
            checked={isRunningChecked} 
            onChange={handleCheckboxChange} 
          />
          <span onClick={handleCheckboxChange}>휴식중인 방만 보기</span>
        </span>
        <div className="roomList">
          {Array.from({ length: 8 }).map((_, index) => (
            <RoomListCard key={index} />
          ))}
        </div>
      </div>
      <div className="createButton">
        <CircleButton buttonSize='large'>
          <IoMdAdd />
        </CircleButton>
      </div>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  height: 100vh;

  .mainContents {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;
    padding: 120px 20px 0px 20px;
    max-width: ${({ theme }) => theme.layoutWidth.screen};
  }

  .title {
    font-size: ${({ theme }) => theme.fontSize.title};
    color: ${({ theme }) => theme.color.black};
    font-weight: bold;
  }

  .buttonGroup {
    display: flex;
    gap: 10px;
  }

  .button {
    padding: 5px 27px;
    border: 1px solid ${({ theme }) => theme.color.grey3};
    border-radius: 20px;
    color: ${({ theme }) => theme.color.grey3};
    cursor: pointer;

    &.active {
      border-color: ${({ theme }) => theme.color.pink6};
      color: ${({ theme }) => theme.color.pink6};
    }
  }

  .options {
    display: flex;
    gap: 5px;
    align-items: center;
    color: ${({ theme }) => theme.color.grey3};

    &.checked {
      color: ${({ theme }) => theme.color.black};
      font-weight: bold;
    }

    input {
      width: ${({ theme }) => theme.fontSize.medium};
      height: ${({ theme }) => theme.fontSize.medium};
      accent-color: ${({ theme }) => theme.color.black};
    }

    span {
      cursor: pointer;
    }
  }

  .roomList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  .createButton {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
`;

export default Main;
