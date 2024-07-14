import useExitRoom from "@/hooks/mutations/useExitRoom";
import { SetStateAction, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircleButton from "../buttons/CircleButton";
import { TExitButton, useModalExit } from "@/store/modalExit";

export type TMode = "watch" | "participant" | undefined; // 관전모드/ 참여자모드/ undefined: url창에 방 아이디를 바로 입력한 경우를 대비

interface Props {
  id: string | undefined;
  deleteButtonHandler: () => void;
  mode?: TMode;
  setExit: React.Dispatch<SetStateAction<() => void>>;
}

const isParticipant = (mode: TMode) => {
  return mode && mode === "participant";
};

const RoomButtons = ({ id, deleteButtonHandler, mode, setExit }: Props) => {
  const { mutate: exitRoom } = useExitRoom(id);
  const navigate = useNavigate();

  const [isFloating, setIsFloating] = useState<boolean>(false);

  const lookArountButtonHandler = () => {
    navigate("/");
  };

  const exitButtonHandler = () => {
    exitRoom();
  };

  const { changeType } = useModalExit();

  const buttonList = [
    {
      name: "방 삭제하기",
      icon: <MdOutlineDeleteOutline />,
      onClick: deleteButtonHandler,
      show: isParticipant(mode),
      type: "delete"
    },
    {
      name: "방 그룹 나가기",
      icon: <RiLogoutBoxRLine className="small" />,
      onClick: exitButtonHandler,
      show: isParticipant(mode),
      type: "exit"
    },
    {
      name: "다른 방 둘러보기",
      icon: <IoHomeOutline className="small" />,
      onClick: lookArountButtonHandler,
      show: true,
      type: "lookaround"
    }
  ].filter((item) => item.show); // 관전 모드인 것들만 보이게

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
        <div className="floating-buttons">
          {buttonList.map((item, i) => (
            <div
              className="item"
              onClick={() => {
                changeType(item.type as TExitButton);
                setExit(() => item.onClick);
              }}
              key={i}
            >
              {item.name}
              <CircleButton buttonColor="active" buttonSize="small">
                {item.icon}
              </CircleButton>
            </div>
          ))}
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
  .floating-buttons {
    position: absolute;
    top: -180px;
    right: 12px;
    width: 130px;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: end;
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
