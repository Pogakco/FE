import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { handleOverlayClick } from "@/utils/handleOverlayClick";
import { ModalContainer, ModalStyle } from "./ModalStyle";

interface Props {
  children: React.ReactNode;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  isRecheckType?: boolean; // 나가기 버튼 모달에서만 사용
}

const Modal = ({ children, setIsModal, onClose, isRecheckType }: Props) => {
  const modalRef = useRef(null);
  const delay = isRecheckType ? 0 : 200;

  return (
    <ModalStyle
      onClick={(e) =>
        handleOverlayClick(e, modalRef, setIsModal, onClose, delay)
      }
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
