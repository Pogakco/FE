import React from "react";

export const handleOverlayClick = (
  e: React.MouseEvent,
  ref: React.RefObject<HTMLElement>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  callback: () => void
) => {
  if (ref.current && !ref.current.contains(e.target as Node)) {
    setOpen(false);
    setTimeout(() => {
      callback();
    }, 200);
  }
};
