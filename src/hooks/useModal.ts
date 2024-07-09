import { useState } from "react";

type TModalContent = "detail" | "create" | null;

interface UseModalReturn {
  isModal: boolean;
  modalContent: TModalContent;
  openModal: (content: TModalContent) => void;
  closeModal: () => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const useModal = (): UseModalReturn => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<TModalContent>(null);

  const closeModal: UseModalReturn['closeModal'] = () => {
    setIsModal(false);
    setModalContent(null);
  };

  const openModal: UseModalReturn['openModal'] = (content) => {
    setModalContent(content);
    setIsModal(true);
  };
  
  return {
    isModal,
    modalContent,
    openModal,
    closeModal,
    setIsModal,
  };
}

export default useModal;
