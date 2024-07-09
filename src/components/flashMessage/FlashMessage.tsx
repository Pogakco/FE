import React, { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  duration: number;
  children: React.ReactNode;
  persistOnHover: boolean;
}

const FlashMessage: React.FC<Props> = ({
  duration,
  children,
  persistOnHover
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const remainingTimeRef = useRef<number>(duration);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<Date | null>(null);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    startRef.current = new Date();
    timerRef.current = window.setTimeout(hide, remainingTimeRef.current);
  }, [hide]);

  const pauseTimer = useCallback(() => {
    if (persistOnHover && startRef.current) {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      remainingTimeRef.current -=
        new Date().getTime() - startRef.current.getTime();
    }
  }, [persistOnHover]);

  useEffect(() => {
    resumeTimer();
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [resumeTimer]);

  return isVisible ? (
    <div onMouseEnter={pauseTimer} onMouseLeave={resumeTimer}>
      {children}
    </div>
  ) : null;
};

FlashMessage.defaultProps = {
  duration: 5000,
  children: null,
  persistOnHover: true
};

export default FlashMessage;
