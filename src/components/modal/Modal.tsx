import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { handleOverlayClick } from "@/utils/handleOverlayClick";
import { ModalContainer, ModalStyle } from "./ModalStyle";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { MODAL_ANIMATION } from "@/constants/animation";

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
      {isRecheckType && (
        <motion.div
          ref={modalRef}
          initial={MODAL_ANIMATION.initial}
          animate={MODAL_ANIMATION.animate}
          exit={MODAL_ANIMATION.exit}
          transition={MODAL_ANIMATION.transition}
        >
          {children}
        </motion.div>
      )}
      {!isRecheckType && (
        <AnimatePresence>
          <ModalContainer
            ref={modalRef}
            initial={MODAL_ANIMATION.initial}
            animate={MODAL_ANIMATION.animate}
            exit={MODAL_ANIMATION.exit}
            transition={MODAL_ANIMATION.transition}
          >
            <div className="exitButton" onClick={onClose}>
              <IoMdClose />
            </div>
            {children}
          </ModalContainer>
        </AnimatePresence>
      )}
    </ModalStyle>
  );
};

export default Modal;
