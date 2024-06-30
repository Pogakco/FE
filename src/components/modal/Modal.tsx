import styled from "styled-components";
import ModalRoomDetail from "./modalContents/ModalRoomDetail";
import RunningStatus from "../commons/RunningStatus";
import { IoMdClose } from "react-icons/io";

const Modal = () => {
  return (
    <ModalStyle>
      <ModalContainer>
        <div className="exitButton"><IoMdClose /></div>
        <div className="modalHeader">
          <h1>뽀모도로 정예부대 구해요</h1>
          <RunningStatus isRunning={false} />
          <hr />
        </div>
        <ModalRoomDetail />
      </ModalContainer>
    </ModalStyle>
  );
};

const ModalStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.overlay.default};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  width: ${({ theme }) => theme.layoutWidth.modal};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ theme }) => theme.color.white};
  padding: 40px 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.default};

  .exitButton {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.color.pink6};
    top: 10px;
    right: 10px;
    padding: 2px;

    svg {
      color: ${({ theme }) => theme.color.white}
    }
  }

  .modalHeader {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
    h1 {
      text-align: center;
      font-size: ${({ theme }) => theme.fontSize.large};
      font-weight: bold;
    }
    hr {
      width: 100%;
      background-color: ${({ theme }) => theme.color.grey1};
      height: 1px;
      border: none;
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
`;

export default Modal;
