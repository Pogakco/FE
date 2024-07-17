import React from "react";

export const handleOverlayClick = (
  e: React.MouseEvent,
  ref: React.RefObject<HTMLElement>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  callback: () => void,
  delay: number = 500
) => {
  if (ref.current && !ref.current.contains(e.target as Node)) {
    setOpen(false);
    setTimeout(() => {
      callback();
    }, delay);
  }
};
