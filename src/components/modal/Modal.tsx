import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { handleOverlayClick } from "@/utils/handleOverlayClick";
import { ModalContainer, ModalStyle } from "./ModalStyle";

interface Props {
  children: React.ReactNode;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  isRecheckType?: boolean;
}

const Modal = ({ children, setIsModal, onClose, isRecheckType }: Props) => {
  const modalRef = useRef(null);

  return (
    <ModalStyle
      onClick={(e) => handleOverlayClick(e, modalRef, setIsModal, onClose)}
    >
      {isRecheckType && <div ref={modalRef}>{children}</div>}
      {!isRecheckType && (
        <ModalContainer ref={modalRef}>
          <div className="exitButton" onClick={onClose}>
            <IoMdClose />
          </div>
          {children}
        </ModalContainer>
      )}
    </ModalStyle>
  );
};

export default Modal;
