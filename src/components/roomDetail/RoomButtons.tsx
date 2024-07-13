import useDeleteRoom from "@/hooks/mutations/useDeleteRoom";
import useExitRoom from "@/hooks/mutations/useExitRoom";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircleButton from "../buttons/CircleButton";

interface Props {
  id: string | undefined;
}

const RoomButtons = ({ id }: Props) => {
  const { mutate: exitRoom } = useExitRoom(id);
  const { mutate: deleteRoom } = useDeleteRoom(id);
  const navigate = useNavigate();

  const [isFloating, setIsFloating] = useState<boolean>(false);

  const lookArountButtonHandler = () => {
    navigate("/");
  };

  const exitButtonHandler = () => {
    exitRoom();
  };

  const deleteButtonHandler = () => {
    deleteRoom();
  };

  const buttonList = [
    {
      name: "방 삭제하기",
      icon: <MdOutlineDeleteOutline />,
      onClick: deleteButtonHandler
    },
    {
      name: "방 나가기",
      icon: <RiLogoutBoxRLine className="small" />,
      onClick: exitButtonHandler
    },
    {
      name: "방 둘러보기",
      icon: <IoHomeOutline className="small" />,
      onClick: lookArountButtonHandler
    }
  ];
  return (
    <RoomButtonsStyle>
      <div className="exit-button">
        <CircleButton
          buttonColor="active"
          buttonSize={"large"}
          onClick={() => setIsFloating(!isFloating)}
        >
          {isFloating ? <IoMdAdd className="x-button" /> : <RiLogoutBoxRLine />}
        </CircleButton>
      </div>
      {isFloating && (
        <div className="buttons">
          {buttonList.map((item, i) => (
            <div className="item" onClick={item.onClick} key={i}>
              {item.name}
              <CircleButton buttonColor="active" buttonSize="small">
                {item.icon}
              </CircleButton>
            </div>
          ))}
          {/* <button className="item" onClick={deleteButtonHandler}>
            방 삭제하기
            <CircleButton buttonColor="active" buttonSize="small">
              <MdOutlineDeleteOutline />
            </CircleButton>
          </button>
          <button className="item" onClick={exitButtonHandler}>
            방 나가기
            <CircleButton buttonColor="active" buttonSize="small">
              <RiLogoutBoxRLine className="small" />
            </CircleButton>
          </button>
          <button className="item" onClick={lookArountButtonHandler}>
            방 둘러보기
            <CircleButton buttonColor="active" buttonSize="small">
              <IoHomeOutline className="small" />
            </CircleButton>
          </button> */}
        </div>
      )}
    </RoomButtonsStyle>
  );
};

const RoomButtonsStyle = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  bottom: 50px;
  right: 50px;

  .exit-button {
    .x-button {
      transform: rotate(-45deg);
    }
  }
  .buttons {
    position: absolute;
    top: -170px;
    right: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${({ theme }) => theme.color.pink6};
      white-space: nowrap;
      cursor: pointer;

      button {
        flex-shrink: 0;
      }
      .small {
        width: 25px;
        height: 25p;
      }
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

export default RoomButtons;
