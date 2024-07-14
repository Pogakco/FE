import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";
import { useModalExit } from "@/store/modalExit";
import { DELETE_TYPE_CASE } from "@/constants/deleteMessage";

interface Props {
  onCancel: () => void;
  onExit: () => void;
}

const ModalRoomExit = ({ onCancel, onExit }: Props) => {
  const { type } = useModalExit();
  const { onClose } = useModalExit();
  return (
    <ModalRoomExitStyle>
      <div className="header">
        <h1>{DELETE_TYPE_CASE[type].title}</h1>
      </div>
      <p className="notice">{DELETE_TYPE_CASE[type].desc}</p>
      <div className="choose-button">
        <SquareButton
          buttonColor="default"
          buttonSize="medium"
          onClick={onCancel}
        >
          취소
        </SquareButton>
        <SquareButton
          buttonColor="active"
          buttonSize="medium"
          onClick={() => {
            onExit();
            onClose();
          }}
        >
          {DELETE_TYPE_CASE[type].button}
        </SquareButton>
      </div>
    </ModalRoomExitStyle>
  );
};

const ModalRoomExitStyle = styled.div`
  width: 408px;
  padding: 36px 24px;
  text-align: center;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: ${({ theme }) => theme.boxShadow.default};

  .header {
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: 600;
    line-height: 1.6;
    margin: 0 0 5px 0;
  }
  .notice {
    color: ${({ theme }) => theme.color.grey3};
    line-height: 1.5;
    margin: 0 0 20px 0;
    word-break: keep-all;
  }
  .choose-button {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    width: 100%;

    button {
      flex: 1;
    }
  }
`;
export default ModalRoomExit;
