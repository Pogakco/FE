import styled from "styled-components";
import CircleButton from "../buttons/CircleButton";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
import useExitRoom from "@/hooks/mutations/useExitRoom";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string | undefined;
  deleteButtonHandler : () => void;
}

const RoomButtons = ({ id, deleteButtonHandler }: Props) => {
  const { mutate: exitRoom } = useExitRoom(id);
  const navigate = useNavigate();

  const lookArountButtonHandler = () => {
    navigate("/");
  };

  const exitButtonHandler = () => {
    exitRoom();
  };

  return (
    <RoomButtonsStyle>
      <div className="deleteButton">
        <CircleButton buttonColor="delete" buttonSize={"large"} onClick={deleteButtonHandler}>
          <MdDeleteForever />
        </CircleButton>
      </div>
      <div className="exitButton">
        <CircleButton buttonColor="active" buttonSize={"large"} onClick={exitButtonHandler}>
          <RiLogoutBoxRLine />
        </CircleButton>
      </div>
      <div className="lookAroundButton">
        <CircleButton buttonColor="active" buttonSize={"large"} onClick={lookArountButtonHandler}>
          <MdRemoveRedEye />
        </CircleButton>
      </div>
    </RoomButtonsStyle>
  );
};

const RoomButtonsStyle = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  bottom: 50px;
  right: 50px;
`;

export default RoomButtons;
