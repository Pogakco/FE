import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { handleOverlayClick } from "@/utils/handleOverlayClick";

interface Props {
  children: React.ReactNode;
  isModal: boolean;
  setIsModal : React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const Modal = ({ children, isModal, setIsModal, onClose }: Props) => {
  const modalRef = useRef(null);

  return (
    <ModalStyle onClick={(e) => handleOverlayClick(e, modalRef, setIsModal, onClose)}>
      <ModalContainer ref={modalRef}>
        <div className="exitButton" onClick={onClose}><IoMdClose /></div>
        {children}
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
    cursor: pointer;

    svg {
      color: ${({ theme }) => theme.color.white}
    }
  }
`;

export default Modal;
