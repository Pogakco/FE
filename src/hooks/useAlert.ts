import { useCallback } from "react";

// 임시
const useAlert = () => {
  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  }, []);

  return { showConfirm };
};

export default useAlert;
