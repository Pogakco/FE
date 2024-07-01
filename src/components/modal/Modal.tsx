import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { handleOverlayClick } from "@/utils/handleOverlayClick";
import { ModalContainer, ModalStyle } from "./ModalStyle";

interface Props {
  children: React.ReactNode;
  setIsModal : React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const Modal = ({ children, setIsModal, onClose }: Props) => {
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



export default Modal;
